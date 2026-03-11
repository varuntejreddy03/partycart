# Production-Grade Technical Specification: PartyCart & Yummy DB Integration

## 1. Rationale: Why a RESTful API?

To ensure a premium and reliable user experience for PartyCart, we recommend a **Direct RESTful API Integration**. This architecture provides:
*   **Single Source of Truth**: Eliminates price discrepancies and outdated menu listings.
*   **Operational Efficiency**: Automates menu updates, reducing manual maintenance for both teams.
*   **Dynamic Inventory**: Supports real-time availability and "Sold Out" statuses, improving customer trust.
*   **Performance**: Optimized for mobile users by fetching only necessary data on-demand.

---

## 2. API Implementation Design

### Protocol & Standards
- **Standard**: RESTful
- **Encoding**: JSON (UTF-8)
- **Method**: `GET`
- **Versioning**: URL-based (`/v1/...`) and body-based `schemaVersion`.
- **Caching**: Implement `ETag` or `Last-Modified` headers to optimize bandwidth and speed.

---

## 3. Data Schema (Standardized)

### A. Root Response
```json
{
  "status": "success",
  "schemaVersion": "1.1",
  "data": {
    "vendorInfo": {
      "vendorId": "string", // PartyCart identifier
      "externalOutletId": "string", // Yummy DB identifier
      "name": "string",
      "currency": "INR"
    },
    "pricingPolicy": {
      "taxInclusive": true,
      "packingFee": 0
    },
    "addonGroups": [ ... ],
    "menuItems": [ ... ]
  }
}
```

### B. Addon Groups (`data.addonGroups`)
Using an array for groups ensures predictable order and standardized validation.
```json
{
  "id": "group_01",
  "displayName": "Choice of Dal",
  "selectType": "radio", // "radio" (single) or "checkbox" (multiple)
  "minSelection": 1,
  "maxSelection": 1,
  "options": [
    { 
      "id": "opt_101", 
      "name": "Tomato Dal", 
      "extraCost": 0, 
      "isVeg": true, 
      "isAvailable": true 
    }
  ]
}
```

### C. Menu Items (`data.menuItems`)
```json
{
  "type": "item",
  "id": "pc_item_01",
  "externalId": "yummy_item_123", // For backend reconciliation
  "name": "Desi Flavour Rice Combo",
  "price": 250,
  "isVeg": true,
  "description": "Served with Rice, Dal, and Curd.",
  "imageUrl": "https://api.yummy.in/media/img01.jpg",
  "addonGroupIds": ["group_01"],
  "tags": ["Popular", "Spicy"],
  "availability": {
    "isAvailable": true,
    "minOrderQty": 10,
    "stockAvailable": 42 // Optional
  }
}
```

---

## 4. Error Handling (Standardized)
The API must return a consistent error block for easier debugging and UI feedback.
```json
{
  "status": "error",
  "error": {
    "code": "VENDOR_NOT_FOUND",
    "message": "The requested vendor ID does not exist.",
    "traceId": "unique-request-id-123"
  }
}
```

---

## 5. Security & Authentication
- **Header**: `Authorization: ApiKey <your-key>`
- **Architecture**: We recommend **Server-to-Server** communication.
  - *Frontend → PartyCart Backend → Yummy API*
  - This ensures API keys are never exposed in the browser.
- **CORS**: If direct browser access is required, restrict `Access-Control-Allow-Origin` strictly to `https://partycart.in`.

---

## 6. Next Steps for Backend Team
1. [ ] Implement the `GET /v1/partycart/vendors/{id}/menu` endpoint.
2. [ ] Provide a stable **Base URL** and **API Key**.
3. [ ] Confirm if any additional pricing fields (Packing/Delivery) need inclusion.

---

### D. Scheduling & Slots (`data.scheduling`)
This section defines how availability is communicated for pre-orders and event bookings.
```json
{
  "isEnabled": true,
  "availableDates": [
    {
      "date": "2024-05-25", // YYYY-MM-DD
      "slots": [
        {
          "id": "slot_01",
          "startTime": "11:00",
          "endTime": "13:00",
          "displayName": "Lunch (11 AM - 1 PM)",
          "isAvailable": true,
          "minOrderQty": 10, // Overrides item-level minOrderQty for this slot
          "maxOrderQty": 100
        }
      ]
    }
  ]
}
```

---

## 7. Frontend Logic & Enforcement

### A. Selection Enforcement (Addons)
To ensure order accuracy, the frontend must implement the following:
*   **Mandatory Selection**: If `minSelection > 0`, the "Add to Cart" button remains disabled until the threshold is met.
*   **Visual Cues**: Show "Select at least X" in the addon header.
*   **Limit Enforcement**: If `maxSelection` is reached, disable unselected checkboxes in that group to prevent over-selection.
*   **Radio vs. Checkbox**: 
    - `selectType: radio` -> Single selection circle UI.
    - `selectType: checkbox` -> Multiple selection box UI.

### B. Scheduling & Order Quantities
*   **Slot-Specific Constraints**: If a user selects a specific date/slot, the item quantity picker must be restricted by the slot's `minOrderQty` and `maxOrderQty`.
*   **UI Flow**:
    1. User selects "Checkout".
    2. Date/Slot picker appears.
    3. Once slot is picked, the system validates the cart against the slot's specific availability.
    4. If constraints aren't met, the user is prompted to adjust quantities (e.g., "The 11 AM slot requires a minimum of 20 plates for this item").

---

## 8. FAQ / Clarifications

**Q1: How are min/max selections being enforced/communicated to the user?**
**A:** Via real-time UI validation. We use header labels (e.g., "Required - Pick 1") and disable checkboxes once the `maxSelection` is hit. The "Add to Cart" action is gated by the `minSelection` requirement.

**Q2: How are we showing schedule dates and time slots?**
**A:** We use a "Slot Picker" modal during the checkout flow or on the vendor page. Each slot in the `data.scheduling` array carries its own `minOrderQty`, which forces the user to meet the vendor's capacity requirements for that specific time window.

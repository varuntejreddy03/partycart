import React, { useState } from 'react';

export const PriceCalculator: React.FC = () => {
  const [guests, setGuests] = useState(20);
  const [eventType, setEventType] = useState('house');
  
  const calculatePrice = () => {
    const basePrice = eventType === 'house' ? 250 : eventType === 'corporate' ? 300 : 400;
    return guests * basePrice;
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-8">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span className="material-icons-round text-primary">calculate</span>
        Quick Price Estimate
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-gray-300 text-sm block mb-2">Event Type</label>
          <select 
            value={eventType} 
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-dark/50 border border-white/20 rounded-lg p-2 text-white text-sm"
          >
            <option value="house">House Party</option>
            <option value="corporate">Corporate</option>
            <option value="premium">Premium/Live</option>
          </select>
        </div>
        
        <div>
          <label className="text-gray-300 text-sm block mb-2">Guests: {guests}</label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-dark/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-xs">Estimated Cost</p>
          <p className="text-2xl font-bold text-primary">₹{calculatePrice().toLocaleString()}</p>
          <p className="text-gray-400 text-xs">*Final price may vary</p>
        </div>
      </div>
    </div>
  );
};
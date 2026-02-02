// Analytics tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }
};

export const trackConversion = (value?: number, currency = 'INR') => {
  trackEvent('Purchase', {
    value,
    currency,
    event_category: 'ecommerce'
  });
};

export const trackQuoteRequest = () => {
  trackEvent('lead', {
    event_category: 'engagement',
    event_label: 'quote_request'
  });
};

export const trackAppDownload = () => {
  trackEvent('app_download_click', {
    event_category: 'engagement',
    event_label: 'yumzy_app'
  });
};

export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    event_category: 'engagement',
    event_label: 'contact'
  });
};
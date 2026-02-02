export const getAppStoreUrl = (): string => {
  const userAgent = navigator.userAgent || navigator.vendor;
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'https://apps.apple.com/app/yumzy/id123456789'; // Replace with actual App Store ID
  }
  
  // Android detection
  return 'https://play.google.com/store/apps/details?id=com.yumzy.app'; // Replace with actual package name
};

export const openYumzyApp = (): void => {
  window.open(getAppStoreUrl(), '_blank', 'noopener,noreferrer');
};

// Add phone number click tracking
export const callPartycart = (): void => {
  window.location.href = 'tel:+919876543210'; // Replace with actual number
};
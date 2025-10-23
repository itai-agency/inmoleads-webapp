// Google Maps API Configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || 'SyC7FzBAXrdBem1S0Zxi2NqGendtUTjEcw';

export const isGoogleMapsConfigured = () => {
  const isConfigured = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY_HERE';
  //console.log('Is Google Maps configured?', isConfigured);
  return isConfigured;
};

// Google Maps API URLs
export const getStaticMapUrl = (lat: number, lng: number, zoom: number = 15, size: string = '400x200') => {
  if (!isGoogleMapsConfigured()) return '';
  
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
};

export const getEmbedMapUrl = (lat: number, lng: number, zoom: number = 15) => {
  if (!isGoogleMapsConfigured()) return '';
  
  return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&maptype=roadmap`;
};

export const optimizeImage = (src, options = {}) => {
  const {
    width = 800,
    quality = 85,
    format = 'webp'
  } = options;

  // If the image is from an external URL, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // For local images, construct the Netlify Image CDN URL
  const baseUrl = import.meta.env.PROD ? 'https://res.cloudinary.com/demo/image/fetch/' : '';
  
  if (import.meta.env.PROD) {
    // In production, use Netlify's image transformation
    const params = [
      'f_' + format,
      'q_' + quality,
      'w_' + width
    ].join(',');
    
    return `${baseUrl}${params}/${window.location.origin}${src}`;
  }

  // In development, return the original image
  return src;
};

// Preload important images
export const preloadImage = (src, options = {}) => {
  const imageUrl = optimizeImage(src, options);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  document.head.appendChild(link);
};

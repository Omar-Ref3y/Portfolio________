export const optimizeImage = (src, options = {}) => {
  const {
    width = 800,
    quality = 85,
    format = 'webp'
  } = options;

  // If the image is from an external URL, return as is
  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }

  // For local images, use relative path
  const imagePath = src.startsWith('/') ? src.slice(1) : src;
  
  if (import.meta.env.PROD) {
    // In production, use relative path
    return `/${imagePath}`;
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

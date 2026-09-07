/**
 * Helper to resolve static asset paths correctly in both local dev (/)
 * and production deployments on GitHub Pages or custom subpaths (/utnsanmiguel/).
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const handleImageError = (e, originalPath) => {
  const img = e.currentTarget;
  if (!img.dataset.triedFallback) {
    img.dataset.triedFallback = '1';
    const clean = (originalPath || img.getAttribute('src') || '').replace(/^\/+/, '');
    // Try relative path
    img.src = `./${clean}`;
  } else if (img.dataset.triedFallback === '1') {
    img.dataset.triedFallback = '2';
    // Try direct root path
    const clean = (originalPath || '').replace(/^\/+/, '');
    img.src = `/${clean}`;
  }
};

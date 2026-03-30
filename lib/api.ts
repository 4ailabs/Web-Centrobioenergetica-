// When embedded in Framer iframe, API calls must go to the Vercel domain directly
export const API_BASE = (() => {
  try {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      return 'https://institutocentrobioenergetica.vercel.app';
    }
  } catch (e) {
    return 'https://institutocentrobioenergetica.vercel.app';
  }
  return '';
})();

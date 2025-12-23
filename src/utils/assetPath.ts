/**
 * Prepend the base path to asset URLs for proper loading in subdirectory deployments
 */
export const assetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return base + path.replace(/^\//, '');
};

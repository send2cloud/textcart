
import { stripMarkdown } from './stripMarkdown';

/**
 * Helper functions for HTML generation
 */

/**
 * Sanitizes text for HTML rendering by removing markdown and escaping HTML entities
 */
export const sanitizeForHTML = (text: string): string => {
  if (!text) return '';
  
  // First strip markdown
  const strippedText = stripMarkdown(text);
  
  // Then escape HTML entities
  return strippedText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Creates a slug from a string for use in IDs and URLs
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

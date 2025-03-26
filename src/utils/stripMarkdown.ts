
/**
 * Utility to strip markdown syntax from text
 */
export const stripMarkdown = (text: string): string => {
  if (!text) return '';
  
  // Remove heading markers (# symbols)
  let result = text.replace(/^#+\s+/gm, '');
  
  // Remove bold/italic markers (*, _)
  result = result.replace(/(\*\*|__)(.*?)\1/g, '$2'); // Bold
  result = result.replace(/(\*|_)(.*?)\1/g, '$2');    // Italic
  
  // Remove code blocks and inline code
  result = result.replace(/```[\s\S]*?```/g, '');   // Code blocks
  result = result.replace(/`([^`]+)`/g, '$1');      // Inline code
  
  // Remove links [text](url) -> text
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove images ![alt](url) -> alt
  result = result.replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove blockquotes
  result = result.replace(/^>\s+/gm, '');
  
  // Handle horizontal rules
  result = result.replace(/^(?:---|\*\*\*|___)\s*$/gm, '');
  
  return result;
};

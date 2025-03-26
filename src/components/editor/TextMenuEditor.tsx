
import React, { useState, useEffect } from 'react';
import { MenuCategory, MenuItem } from '../../contexts/RestaurantContext';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

interface TextMenuEditorProps {
  categories: MenuCategory[];
  onUpdateMenu: (newCategories: MenuCategory[]) => void;
}

interface ParsingError {
  lineNumber: number;
  message: string;
  line: string;
}

const TextMenuEditor: React.FC<TextMenuEditorProps> = ({ categories, onUpdateMenu }) => {
  const [menuText, setMenuText] = useState<string>('');
  const [parsingErrors, setParsingErrors] = useState<ParsingError[]>([]);
  
  // Initialize menu text from categories
  useEffect(() => {
    // Only initialize if menuText is empty and we have categories
    if (menuText === '' && categories.length > 0) {
      const text = categories.map(category => (
        `${category.name}\n${category.items.map(item => 
          `- ${item.name}: ${item.description} = ${item.price}`
        ).join('\n')}`
      )).join('\n\n');
      
      setMenuText(text);
    }
  }, [categories, menuText]);

  const detectMarkdown = (text: string): boolean => {
    // Common markdown patterns to detect
    const markdownPatterns = [
      /^#+\s.+$/m,             // Headings (e.g., # Heading)
      /^>\s.+$/m,              // Blockquotes
      /^-{3,}$|^_{3,}$/m,      // Horizontal rules
      /!\[.*?\]\(.*?\)/,       // Image links
      /\[.*?\]\(.*?\)/,        // Links
      /\*\*.+?\*\*/,           // Bold
      /\*.+?\*/,               // Italic
      /`[^`]+`/,               // Inline code
      /^```[\s\S]*?```$/m,     // Code blocks
      /^[0-9]+\.\s.+$/m,       // Numbered lists
      /^[*+-]\s(?![^:]*?=)/m,  // Bullet points without our format pattern
    ];

    return markdownPatterns.some(pattern => pattern.test(text));
  };

  const parseMenuText = (): { categories: MenuCategory[] | null, errors: ParsingError[] } => {
    const errors: ParsingError[] = [];
    
    // Check for markdown formatting
    if (detectMarkdown(menuText)) {
      errors.push({
        lineNumber: 0,
        message: 
          "It looks like you're using markdown formatting, but we need a specific format. Please use this format instead:\n\n" +
          "Category Name\n" +
          "- Item Name: Description = $Price\n" +
          "- Another Item: Its description = $Price\n\n" +
          "Another Category\n" +
          "- Item Name: Description = $Price",
        line: ""
      });
      return { categories: null, errors };
    }
    
    const lines = menuText.split('\n').map((line, idx) => ({ 
      text: line.trim(), 
      index: idx + 1
    })).filter(line => line.text.length > 0);
    
    const newCategories: MenuCategory[] = [];
    let currentCategory: MenuCategory | null = null;

    try {
      for (let i = 0; i < lines.length; i++) {
        const { text: line, index: lineNumber } = lines[i];
        
        // If line doesn't start with '-', it's a category
        if (!line.startsWith('-')) {
          if (currentCategory) {
            newCategories.push(currentCategory);
          }
          
          currentCategory = {
            id: currentCategory?.id || Date.now().toString() + i,
            name: line,
            items: []
          };
        } 
        // Line starts with '-', it's an item
        else if (currentCategory) {
          // Remove the '-' and trim
          const itemContent = line.substring(1).trim();
          
          // Try to parse with colon for name and description
          const firstColonIndex = itemContent.indexOf(':');
          if (firstColonIndex === -1) {
            // No colon found, try to be lenient and just use the text before any equals sign as the name
            const equalsIndex = itemContent.indexOf('=');
            if (equalsIndex !== -1) {
              const name = itemContent.substring(0, equalsIndex).trim();
              const price = itemContent.substring(equalsIndex + 1).trim();
              
              currentCategory.items.push({
                id: Date.now().toString() + i,
                name,
                description: '',
                price
              });
              
              errors.push({
                lineNumber,
                message: "Missing colon between name and description. Item added with empty description.",
                line
              });
            } else {
              // No equals sign either, just use the whole thing as a name
              currentCategory.items.push({
                id: Date.now().toString() + i,
                name: itemContent,
                description: '',
                price: 'N/A'
              });
              
              errors.push({
                lineNumber,
                message: "Missing format. Please use: '- Name: Description = Price'. Item added with empty description and no price.",
                line
              });
            }
            continue;
          }
          
          const name = itemContent.substring(0, firstColonIndex).trim();
          const afterColon = itemContent.substring(firstColonIndex + 1).trim();
          
          // Split by equals for description and price
          const equalsIndex = afterColon.lastIndexOf('=');
          if (equalsIndex === -1) {
            // No equals sign, use the whole thing as description
            currentCategory.items.push({
              id: Date.now().toString() + i,
              name,
              description: afterColon,
              price: 'N/A'
            });
            
            errors.push({
              lineNumber,
              message: "Missing equals sign for price. Item added with 'N/A' as price. Format should be '- Name: Description = Price'.",
              line
            });
            continue;
          }
          
          const description = afterColon.substring(0, equalsIndex).trim();
          let price = afterColon.substring(equalsIndex + 1).trim();
          
          // Add dollar sign if missing
          if (price && !price.includes('$') && !isNaN(parseFloat(price))) {
            price = '$' + price;
          }
          
          currentCategory.items.push({
            id: Date.now().toString() + i,
            name,
            description,
            price
          });
        } else {
          // Item without a category
          errors.push({
            lineNumber,
            message: "Item found before any category was defined. Please add a category name (without a dash) before listing items.",
            line
          });
        }
      }
      
      // Add the last category if it exists
      if (currentCategory) {
        newCategories.push(currentCategory);
      }
      
      // Check if we have at least one valid category
      if (newCategories.length === 0) {
        errors.push({
          lineNumber: 1,
          message: "No valid categories found. Please add at least one category name followed by items.",
          line: ""
        });
        return { categories: null, errors };
      }
      
      // Check if all categories have at least one item
      const emptyCategoryIndex = newCategories.findIndex(cat => cat.items.length === 0);
      if (emptyCategoryIndex !== -1) {
        errors.push({
          lineNumber: lines.findIndex(l => l.text === newCategories[emptyCategoryIndex].name) + 1,
          message: `Category "${newCategories[emptyCategoryIndex].name}" has no items.`,
          line: newCategories[emptyCategoryIndex].name
        });
        // We still return the categories, just with a warning
      }
      
      return { categories: newCategories, errors };
    } catch (error) {
      errors.push({
        lineNumber: 0,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        line: ""
      });
      return { categories: null, errors };
    }
  };

  const handleUpdateMenu = () => {
    const { categories: newCategories, errors } = parseMenuText();
    setParsingErrors(errors);
    
    if (errors.length > 0) {
      // Show toast for errors but continue if we have valid categories
      toast.warning(`${errors.length} issue${errors.length > 1 ? 's' : ''} found in menu text. Check highlighted lines.`);
    }
    
    if (newCategories) {
      onUpdateMenu(newCategories);
      toast.success('Menu updated successfully' + (errors.length > 0 ? ' with warnings' : ''));
    } else {
      toast.error('Could not update menu due to critical errors');
    }
  };

  // Function to get line numbers with errors
  const getErrorLineNumbers = (): number[] => {
    return parsingErrors.map(err => err.lineNumber);
  };

  return (
    <div className="bg-card shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Text Menu Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={handleUpdateMenu}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Update Preview
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Enter your menu using the format: <br />
          <code className="bg-muted p-1 rounded">Category Name</code><br />
          <code className="bg-muted p-1 rounded">- Item Name: Description = $Price</code>
        </p>
      </div>

      <div className="relative">
        <textarea
          value={menuText}
          onChange={(e) => {
            setMenuText(e.target.value);
            // Clear errors when the user edits the text
            if (parsingErrors.length > 0) {
              setParsingErrors([]);
            }
          }}
          className="w-full h-96 p-4 border rounded-md font-mono text-sm"
          placeholder="Starters
- Samosa: Deep-fried pastry with savory filling = $5.99
- Spring Rolls: Crispy rolls with vegetables = $4.99

Main Course
- Butter Chicken: Chicken in creamy tomato sauce = $14.99
- Veggie Curry: Mixed vegetables in curry sauce = $12.99"
        />
        
        {parsingErrors.length > 0 && (
          <div className="mt-4 text-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Issues found:</span>
            </div>
            <div className="max-h-40 overflow-y-auto bg-muted/50 p-3 rounded-md">
              {parsingErrors.map((error, index) => (
                <div key={index} className="flex items-start gap-2 mb-2 text-sm">
                  <span className="font-medium min-w-8">Line {error.lineNumber}:</span>
                  <div>
                    <div className="text-red-500">{error.message}</div>
                    {error.line && (
                      <code className="block mt-1 text-xs bg-background p-1 rounded">
                        {error.line}
                      </code>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextMenuEditor;

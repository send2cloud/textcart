
import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '../../contexts/RestaurantContext';
import { toast } from 'sonner';

interface TextMenuEditorProps {
  categories: MenuCategory[];
  onUpdateMenu: (newCategories: MenuCategory[]) => void;
}

const TextMenuEditor: React.FC<TextMenuEditorProps> = ({ categories, onUpdateMenu }) => {
  const [menuText, setMenuText] = useState<string>(() => {
    // Convert existing categories to text format
    return categories.map(category => (
      `${category.name}\n${category.items.map(item => 
        `- ${item.name}: ${item.description} = ${item.price}`
      ).join('\n')}`
    )).join('\n\n');
  });

  const parseMenuText = (): MenuCategory[] | null => {
    try {
      const lines = menuText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      const newCategories: MenuCategory[] = [];
      let currentCategory: MenuCategory | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
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
          
          // Split by colon for name and description
          const firstColonIndex = itemContent.indexOf(':');
          if (firstColonIndex === -1) {
            throw new Error(`Line "${line}" is missing a colon to separate name and description`);
          }
          
          const name = itemContent.substring(0, firstColonIndex).trim();
          const afterColon = itemContent.substring(firstColonIndex + 1).trim();
          
          // Split by equals for description and price
          const equalsIndex = afterColon.lastIndexOf('=');
          if (equalsIndex === -1) {
            throw new Error(`Line "${line}" is missing an equals sign to indicate price`);
          }
          
          const description = afterColon.substring(0, equalsIndex).trim();
          const price = afterColon.substring(equalsIndex + 1).trim();
          
          currentCategory.items.push({
            id: Date.now().toString() + i,
            name,
            description,
            price
          });
        }
      }
      
      // Add the last category if it exists
      if (currentCategory) {
        newCategories.push(currentCategory);
      }
      
      return newCategories;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error parsing menu: ${error.message}`);
      } else {
        toast.error('An unknown error occurred while parsing the menu');
      }
      return null;
    }
  };

  const handleUpdateMenu = () => {
    const newCategories = parseMenuText();
    if (newCategories) {
      onUpdateMenu(newCategories);
      toast.success('Menu updated successfully');
    }
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

      <textarea
        value={menuText}
        onChange={(e) => setMenuText(e.target.value)}
        className="w-full h-96 p-4 border rounded-md font-mono text-sm"
        placeholder="Starters
- Samosa: Deep-fried pastry with savory filling = $5.99
- Spring Rolls: Crispy rolls with vegetables = $4.99

Main Course
- Butter Chicken: Chicken in creamy tomato sauce = $14.99
- Veggie Curry: Mixed vegetables in curry sauce = $12.99"
      />
    </div>
  );
};

export default TextMenuEditor;

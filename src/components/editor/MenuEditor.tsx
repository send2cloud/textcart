
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MenuCategory, MenuItem } from '../../contexts/RestaurantContext';
import CategorySection from './CategorySection';
import { toast } from 'sonner';

interface MenuEditorProps {
  categories: MenuCategory[];
  onUpdateCategories: (categories: MenuCategory[]) => void;
}

const MenuEditor: React.FC<MenuEditorProps> = ({ categories, onUpdateCategories }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    
    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      items: []
    };
    
    onUpdateCategories([...categories, newCategory]);
    setNewCategoryName('');
    toast.success('Category added');
  };

  const handleDeleteCategory = (categoryId: string) => {
    onUpdateCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success('Category deleted');
  };

  const handleAddMenuItem = (categoryId: string) => {
    const newItem = {
      id: Date.now().toString(),
      name: 'New Item',
      description: 'Description',
      price: '$0.00'
    };
    
    onUpdateCategories(
      categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: [...cat.items, newItem]
          };
        }
        return cat;
      })
    );
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    onUpdateCategories(
      categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          };
        }
        return cat;
      })
    );
  };

  const handleUpdateMenuItem = (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => {
    onUpdateCategories(
      categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map(item => {
              if (item.id === itemId) {
                return {
                  ...item,
                  [field]: value
                };
              }
              return item;
            })
          };
        }
        return cat;
      })
    );
  };

  return (
    <div className="bg-card shadow rounded-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      <h2 className="text-lg font-medium mb-4">Menu Categories & Items</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="px-3 py-2 border rounded-md flex-1"
        />
        <button
          onClick={handleAddCategory}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onAddMenuItem={handleAddMenuItem}
            onDeleteCategory={handleDeleteCategory}
            onUpdateMenuItem={handleUpdateMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuEditor;

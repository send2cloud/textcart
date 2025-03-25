
import React, { useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Plus, Trash, GripVertical, Save } from 'lucide-react';

const MenuEditor: React.FC = () => {
  const { restaurant, setRestaurant, saveRestaurant } = useRestaurant();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  
  if (!restaurant) {
    return <div>Loading...</div>;
  }

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
    
    setRestaurant({
      ...restaurant,
      categories: [...restaurant.categories, newCategory]
    });
    
    setNewCategoryName('');
    toast.success('Category added');
  };

  const handleDeleteCategory = (categoryId: string) => {
    setRestaurant({
      ...restaurant,
      categories: restaurant.categories.filter(cat => cat.id !== categoryId)
    });
    toast.success('Category deleted');
  };

  const handleAddMenuItem = (categoryId: string) => {
    const newItem = {
      id: Date.now().toString(),
      name: 'New Item',
      description: 'Description',
      price: '$0.00'
    };
    
    setRestaurant({
      ...restaurant,
      categories: restaurant.categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: [...cat.items, newItem]
          };
        }
        return cat;
      })
    });
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    setRestaurant({
      ...restaurant,
      categories: restaurant.categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          };
        }
        return cat;
      })
    });
  };

  const handleSaveAll = () => {
    saveRestaurant();
    toast.success('Menu saved successfully');
  };

  const handleUpdateMenuItem = (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setRestaurant({
      ...restaurant,
      categories: restaurant.categories.map(cat => {
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
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menu Editor</h1>
        <button 
          onClick={handleSaveAll}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          Save Menu
        </button>
      </div>

      <div className="bg-card shadow rounded-lg p-6">
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
          {restaurant.categories.map((category) => (
            <div key={category.id} className="border rounded-md">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <h3 className="font-medium">{category.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddMenuItem(category.id)}
                    className="p-1 text-primary hover:text-primary/80"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 text-destructive hover:text-destructive/80"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {category.items.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No items in this category</p>
                ) : (
                  category.items.map((item) => (
                    <div key={item.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateMenuItem(category.id, item.id, 'name', e.target.value)}
                            className="font-medium border-b border-transparent hover:border-primary focus:border-primary outline-none"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteMenuItem(category.id, item.id)}
                          className="p-1 text-destructive hover:text-destructive/80"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <textarea
                            value={item.description}
                            onChange={(e) => handleUpdateMenuItem(category.id, item.id, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md min-h-[80px]"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handleUpdateMenuItem(category.id, item.id, 'price', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Price"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                <button
                  onClick={() => handleAddMenuItem(category.id)}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;

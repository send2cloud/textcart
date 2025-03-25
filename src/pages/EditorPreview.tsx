
import React, { useEffect, useState } from 'react';
import { useRestaurant, MenuItem } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Save, Download, Copy, ExternalLink, Bug } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const EditorPreview: React.FC = () => {
  const { restaurant, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  useEffect(() => {
    if (restaurant) {
      // Generate HTML based on template and restaurant data
      const html = generateHTML(restaurant);
      setGeneratedHTML(html);
    }
  }, [restaurant]);
  
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

  const handleSaveAll = () => {
    saveRestaurant();
    toast.success('Menu saved successfully');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedHTML], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `${restaurant?.info.name.toLowerCase().replace(/\s+/g, '-')}-menu.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('HTML file downloaded successfully');
  };
  
  const handleCopyHTML = () => {
    navigator.clipboard.writeText(generatedHTML);
    toast.success('HTML copied to clipboard');
  };

  const handleOpenInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(generatedHTML);
      newWindow.document.close();
    } else {
      toast.error('Could not open new window. Please check your popup blocker settings.');
    }
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Editor + Preview</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleSaveAll}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
          >
            <Save className="w-4 h-4" />
            Save Menu
          </button>
          <button
            onClick={handleCopyHTML}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90"
          >
            <Copy className="w-4 h-4" />
            Copy HTML
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
          <button
            onClick={toggleDebugInfo}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2 hover:bg-yellow-600"
          >
            <Bug className="w-4 h-4" />
            {showDebugInfo ? 'Hide Debug' : 'Debug Cart'}
          </button>
        </div>
      </div>

      {showDebugInfo && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium mb-2">Cart Settings Debug Info:</h3>
          <pre className="text-xs bg-black text-white p-2 rounded overflow-auto">
            {JSON.stringify(restaurant.cartSettings, null, 2)}
          </pre>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="bg-card shadow rounded-lg p-6 h-[calc(100vh-200px)] overflow-y-auto">
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
              <span className="text-xl font-bold">+</span>
              Add Category
            </button>
          </div>

          <div className="space-y-6">
            {restaurant.categories.map((category) => (
              <div key={category.id} className="border rounded-md">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 cursor-move">≡</span>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddMenuItem(category.id)}
                      className="p-1 text-primary hover:text-primary/80"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-destructive hover:text-destructive/80"
                    >
                      <span className="text-xl">🗑️</span>
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
                            <span className="text-gray-400 cursor-move">≡</span>
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
                            <span className="text-xl">🗑️</span>
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
                    <span className="text-xl font-bold">+</span> Add Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-card shadow rounded-lg p-6 h-[calc(100vh-200px)] overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Live Preview</h3>
            <button
              onClick={handleOpenInNewWindow}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90 text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              Open in New Window
            </button>
          </div>
          <div className="border rounded-md h-[calc(100%-40px)] overflow-hidden">
            <iframe
              title="Live Preview"
              srcDoc={generatedHTML}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;

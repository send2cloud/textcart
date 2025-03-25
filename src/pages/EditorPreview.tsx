
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Save, Download, Copy, ExternalLink, Smartphone, Tablet, Monitor, Plus, Trash, GripVertical } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const EditorPreview: React.FC = () => {
  const { restaurant, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  useEffect(() => {
    if (restaurant) {
      // Generate HTML based on template and restaurant data with Alpine.js
      const html = generateHTML(restaurant);
      setGeneratedHTML(html);
    }
  }, [restaurant]);
  
  if (!restaurant) {
    return <div>Loading...</div>;
  }

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

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-full max-w-[375px]';
      case 'tablet': return 'w-full max-w-[768px]';
      case 'desktop': return 'w-full max-w-[1200px]';
    }
  };

  // Menu Editor Functions
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

  const handleUpdateMenuItem = (categoryId: string, itemId: string, field: keyof typeof restaurant.categories[0].items[0], value: string) => {
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Menu Editor & Preview</h1>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Editor Section */}
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

        {/* Preview Section */}
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Live Preview</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md ${viewMode === 'mobile' ? 'bg-background shadow' : ''} transition-all`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md ${viewMode === 'tablet' ? 'bg-background shadow' : ''} transition-all`}
                >
                  <Tablet className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md ${viewMode === 'desktop' ? 'bg-background shadow' : ''} transition-all`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleOpenInNewWindow}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90 text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                Open in New Window
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className={`${getPreviewWidth()} border rounded-md h-[600px] overflow-hidden`}>
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
    </div>
  );
};

export default EditorPreview;

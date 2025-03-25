
import React from 'react';
import { Plus, Trash, GripVertical } from 'lucide-react';
import { MenuCategory, MenuItem } from '../../contexts/RestaurantContext';
import MenuItem from './MenuItem';

interface CategorySectionProps {
  category: MenuCategory;
  onAddMenuItem: (categoryId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateMenuItem: (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => void;
  onDeleteMenuItem: (categoryId: string, itemId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  onAddMenuItem,
  onDeleteCategory,
  onUpdateMenuItem,
  onDeleteMenuItem
}) => {
  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <h3 className="font-medium">{category.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddMenuItem(category.id)}
            className="p-1 text-primary hover:text-primary/80"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDeleteCategory(category.id)}
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
            <MenuItem
              key={item.id}
              item={item}
              categoryId={category.id}
              onUpdateItem={onUpdateMenuItem}
              onDeleteItem={onDeleteMenuItem}
            />
          ))
        )}
        
        <button
          onClick={() => onAddMenuItem(category.id)}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>
    </div>
  );
};

export default CategorySection;

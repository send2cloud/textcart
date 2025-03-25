
import React from 'react';
import { Trash, GripVertical } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../contexts/RestaurantContext';

interface MenuItemProps {
  item: MenuItemType;
  categoryId: string;
  onUpdateItem: (categoryId: string, itemId: string, field: keyof MenuItemType, value: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, categoryId, onUpdateItem, onDeleteItem }) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <input
            type="text"
            value={item.name}
            onChange={(e) => onUpdateItem(categoryId, item.id, 'name', e.target.value)}
            className="font-medium border-b border-transparent hover:border-primary focus:border-primary outline-none"
          />
        </div>
        <button
          onClick={() => onDeleteItem(categoryId, item.id)}
          className="p-1 text-destructive hover:text-destructive/80"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <textarea
            value={item.description}
            onChange={(e) => onUpdateItem(categoryId, item.id, 'description', e.target.value)}
            className="w-full p-2 border rounded-md min-h-[80px]"
          />
        </div>
        <div>
          <input
            type="text"
            value={item.price}
            onChange={(e) => onUpdateItem(categoryId, item.id, 'price', e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Price"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

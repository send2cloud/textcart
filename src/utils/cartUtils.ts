
import { MenuItem } from "../data/menuData";

export interface CartItem extends MenuItem {
  quantity: number;
}

export function formatOrderMessage(items: CartItem[], restaurantName: string): string {
  const orderItems = items.map(item => `${item.quantity}x ${item.name} (${item.price})`).join("\n");
  
  const message = `
New order from ${restaurantName}:

${orderItems}

Thank you!
`.trim();

  return encodeURIComponent(message);
}

export function getSMSLink(phoneNumber: string, message: string): string {
  return `sms:${phoneNumber}?body=${message}`;
}

export function getWhatsAppLink(phoneNumber: string, message: string): string {
  // Remove any non-digits from the phone number
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${formattedPhone}?text=${message}`;
}

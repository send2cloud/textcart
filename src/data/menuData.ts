
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuData: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      {
        id: "s1",
        name: "Garlic Bread",
        description: "Freshly baked bread with garlic butter",
        price: "$4.99"
      },
      {
        id: "s2",
        name: "Mozzarella Sticks",
        description: "Crispy fried mozzarella with marinara sauce",
        price: "$6.99"
      },
      {
        id: "s3",
        name: "Bruschetta",
        description: "Toasted bread topped with tomatoes, garlic, and basil",
        price: "$5.99"
      }
    ]
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      {
        id: "m1",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: "$12.99"
      },
      {
        id: "m2",
        name: "Spaghetti Carbonara",
        description: "Spaghetti with creamy egg sauce, cheese, and pancetta",
        price: "$14.99"
      },
      {
        id: "m3",
        name: "Chicken Parmesan",
        description: "Breaded chicken with marinara sauce and melted cheese",
        price: "$15.99"
      },
      {
        id: "m4",
        name: "Vegetable Lasagna",
        description: "Layered pasta with vegetables, cheese, and tomato sauce",
        price: "$13.99"
      }
    ]
  },
  {
    id: "breads",
    title: "Breads",
    items: [
      {
        id: "b1",
        name: "Focaccia",
        description: "Italian bread with olive oil and rosemary",
        price: "$3.99"
      },
      {
        id: "b2",
        name: "Ciabatta",
        description: "Light and airy Italian white bread",
        price: "$3.49"
      }
    ]
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        id: "d1",
        name: "Tiramisu",
        description: "Coffee-flavored Italian dessert with mascarpone cheese",
        price: "$6.99"
      },
      {
        id: "d2",
        name: "Cannoli",
        description: "Tube-shaped pastry filled with sweet ricotta cream",
        price: "$5.99"
      },
      {
        id: "d3",
        name: "Panna Cotta",
        description: "Italian custard with vanilla bean and mixed berries",
        price: "$6.49"
      }
    ]
  }
];

export const restaurantInfo = {
  name: "Bella Cucina",
  phone: "+1234567890",
  address: "123 Italian Street, Foodville, FC 12345",
  location: {
    lat: 40.7128,
    lng: -74.0060
  }
};

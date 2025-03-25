
import { RestaurantData } from "../contexts/RestaurantContext";

export const indianRestaurantSample: RestaurantData = {
  id: "indian-restaurant",
  info: {
    name: "Taj Mahal",
    phone: "+1234567890",
    address: "456 Curry Lane, Spiceville, NY 10001"
  },
  categories: [
    {
      id: "appetizers",
      name: "Appetizers",
      items: [
        {
          id: "samosa",
          name: "Samosa",
          description: "Crispy pastry filled with spiced potatoes and peas.",
          price: "$4.99"
        },
        {
          id: "pakora",
          name: "Vegetable Pakora",
          description: "Assorted vegetables dipped in chickpea batter and deep-fried.",
          price: "$5.99"
        },
        {
          id: "paneer-tikka",
          name: "Paneer Tikka",
          description: "Cubes of cottage cheese marinated in spices and grilled in tandoor.",
          price: "$8.99"
        },
        {
          id: "papadum",
          name: "Papadum",
          description: "Crispy lentil crackers served with chutney.",
          price: "$3.99"
        }
      ]
    },
    {
      id: "tandoori",
      name: "Tandoori Specialties",
      items: [
        {
          id: "chicken-tikka",
          name: "Chicken Tikka",
          description: "Boneless chicken pieces marinated in yogurt and spices, grilled in tandoor.",
          price: "$14.99"
        },
        {
          id: "tandoori-chicken",
          name: "Tandoori Chicken",
          description: "Chicken marinated in yogurt and authentic spices, grilled in tandoor.",
          price: "$15.99"
        },
        {
          id: "seekh-kebab",
          name: "Seekh Kebab",
          description: "Minced lamb mixed with herbs and spices, skewered and grilled in tandoor.",
          price: "$16.99"
        },
        {
          id: "tandoori-shrimp",
          name: "Tandoori Shrimp",
          description: "Jumbo shrimp marinated in spices and grilled in tandoor.",
          price: "$18.99"
        }
      ]
    },
    {
      id: "curries",
      name: "Curry Dishes",
      items: [
        {
          id: "butter-chicken",
          name: "Butter Chicken",
          description: "Tender chicken in a rich tomato, butter, and cream sauce.",
          price: "$16.99"
        },
        {
          id: "chicken-tikka-masala",
          name: "Chicken Tikka Masala",
          description: "Grilled chicken pieces in a spiced tomato cream sauce.",
          price: "$16.99"
        },
        {
          id: "lamb-rogan-josh",
          name: "Lamb Rogan Josh",
          description: "Tender lamb cooked in a rich onion, yogurt, and aromatic spice sauce.",
          price: "$17.99"
        },
        {
          id: "saag-paneer",
          name: "Saag Paneer",
          description: "Homemade cottage cheese cubes in a creamy spinach sauce.",
          price: "$14.99"
        },
        {
          id: "chana-masala",
          name: "Chana Masala",
          description: "Chickpeas cooked with onions, tomatoes, and spices.",
          price: "$13.99"
        }
      ]
    },
    {
      id: "biryani",
      name: "Biryani",
      items: [
        {
          id: "chicken-biryani",
          name: "Chicken Biryani",
          description: "Fragrant basmati rice cooked with chicken, herbs, and spices.",
          price: "$15.99"
        },
        {
          id: "lamb-biryani",
          name: "Lamb Biryani",
          description: "Tender pieces of lamb cooked with basmati rice and aromatic spices.",
          price: "$16.99"
        },
        {
          id: "vegetable-biryani",
          name: "Vegetable Biryani",
          description: "Basmati rice cooked with mixed vegetables and spices.",
          price: "$13.99"
        },
        {
          id: "shrimp-biryani",
          name: "Shrimp Biryani",
          description: "Basmati rice cooked with shrimp and aromatic spices.",
          price: "$17.99"
        }
      ]
    },
    {
      id: "breads",
      name: "Breads",
      items: [
        {
          id: "naan",
          name: "Naan",
          description: "Traditional Indian leavened bread baked in tandoor.",
          price: "$2.99"
        },
        {
          id: "garlic-naan",
          name: "Garlic Naan",
          description: "Naan bread topped with garlic and herbs.",
          price: "$3.99"
        },
        {
          id: "roti",
          name: "Roti",
          description: "Whole wheat unleavened bread baked in tandoor.",
          price: "$2.49"
        },
        {
          id: "paratha",
          name: "Paratha",
          description: "Flaky layered whole wheat bread.",
          price: "$3.99"
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "gulab-jamun",
          name: "Gulab Jamun",
          description: "Deep-fried milk solid balls soaked in sweet rose-flavored syrup.",
          price: "$4.99"
        },
        {
          id: "kheer",
          name: "Kheer",
          description: "Traditional rice pudding with cardamom and nuts.",
          price: "$4.99"
        },
        {
          id: "rasmalai",
          name: "Rasmalai",
          description: "Soft cheese patties soaked in sweetened, thickened milk delicately flavored with cardamom.",
          price: "$5.99"
        },
        {
          id: "mango-kulfi",
          name: "Mango Kulfi",
          description: "Traditional Indian ice cream made with mangoes.",
          price: "$5.99"
        }
      ]
    }
  ],
  templateType: 'elegant',
  themeColors: {
    primary: '#C13438',
    secondary: '#FFC107',
    background: '#FFF8E1',
    text: '#333333',
    accent: '#4CAF50'
  }
};

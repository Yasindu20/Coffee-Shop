export const menuData = {
  coffee: [
    {
      name: "Signature Espresso",
      description: "Rich, bold espresso with notes of dark chocolate and caramel, sourced from premium Colombian beans",
      price: "$4.50",
      image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "espresso"
    },
    {
      name: "Artisan Latte",
      description: "Smooth espresso with steamed milk and artistic foam design, crafted by our expert baristas",
      price: "$5.25",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "milk-based"
    },
    {
      name: "Cold Brew Delight",
      description: "Slow-steeped for 12 hours, served over ice with a hint of vanilla and natural sweetness",
      price: "$4.75",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "cold-brew"
    },
    {
      name: "Cappuccino Supreme",
      description: "Equal parts espresso, steamed milk, and foam, dusted with premium cocoa powder",
      price: "$4.95",
      image: "https://images.unsplash.com/photo-1572286258217-aac1b31ef906?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "milk-based"
    },
    {
      name: "Mocha Royale",
      description: "Rich espresso blended with premium Belgian chocolate and steamed milk, topped with whipped cream",
      price: "$5.75",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "specialty"
    },
    {
      name: "Vanilla Bean Macchiato",
      description: "Espresso marked with vanilla-infused steamed milk and finished with caramel drizzle",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "specialty"
    }
  ],
  pastries: [
    {
      name: "Artisan Croissant",
      description: "Buttery, flaky pastry made with European butter and baked fresh daily in our ovens",
      price: "$3.50",
      image: "https://images.unsplash.com/photo-1555507036-ab794f4eecd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "pastries"
    },
    {
      name: "Belgian Chocolate Danish",
      description: "Rich pastry filled with premium Belgian chocolate and finished with a delicate glaze",
      price: "$4.25",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "sweet"
    },
    {
      name: "Wild Blueberry Muffin",
      description: "Moist muffin bursting with wild blueberries and topped with a crunchy streusel",
      price: "$3.75",
      image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "muffins"
    },
    {
      name: "Honey Almond Scone",
      description: "Traditional English scone with sliced almonds, local honey, and a touch of vanilla",
      price: "$3.95",
      image: "https://images.unsplash.com/photo-1519205440081-2ebdf1e9ad02?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "scones"
    },
    {
      name: "Lemon Raspberry Tart",
      description: "Delicate pastry shell filled with tangy lemon curd and fresh raspberries",
      price: "$4.95",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "tarts"
    },
    {
      name: "Cinnamon Roll",
      description: "House-made cinnamon roll with brown butter glaze, baked to golden perfection",
      price: "$4.50",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "sweet"
    }
  ],
  lunch: [
    {
      name: "Gourmet Grilled Sandwich",
      description: "Fresh ingredients on our signature sourdough bread with premium meats and artisan cheeses",
      price: "$8.95",
      image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "sandwiches"
    },
    {
      name: "Harvest Garden Salad",
      description: "Mixed organic greens with seasonal vegetables, nuts, and house-made vinaigrette",
      price: "$7.50",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "salads"
    },
    {
      name: "Chef's Daily Soup",
      description: "Our chef's daily selection served with warm artisan bread and herb butter",
      price: "$6.75",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "soups"
    },
    {
      name: "Classic Quiche Lorraine",
      description: "Traditional French quiche with applewood smoked bacon and aged Swiss cheese",
      price: "$9.25",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "quiche"
    },
    {
      name: "Mediterranean Wrap",
      description: "Grilled vegetables, hummus, feta cheese, and fresh herbs in a spinach tortilla",
      price: "$8.50",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      category: "wraps"
    },
    {
      name: "Avocado Toast Deluxe",
      description: "Smashed avocado on multigrain toast with heirloom tomatoes and everything seasoning",
      price: "$7.95",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      category: "toast"
    }
  ]
}
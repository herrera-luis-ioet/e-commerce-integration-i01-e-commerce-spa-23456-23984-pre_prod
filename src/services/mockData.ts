import { Product, SortOption } from '../types/product.types';

/**
 * Mock product data for development and testing
 * This data follows the Product interface structure
 */
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    brand: 'SoundMaster',
    rating: 4.8,
    stock: 45,
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-05-20T14:20:00Z',
    isNew: false,
    isFeatured: true,
    discount: 10,
    tags: ['wireless', 'audio', 'premium'],
    reviews: [
      {
        id: '101',
        userId: 'user1',
        username: 'AudioPhile',
        rating: 5,
        comment: 'Best headphones I\'ve ever owned. The sound quality is amazing!',
        createdAt: '2023-04-20T09:15:00Z'
      },
      {
        id: '102',
        userId: 'user2',
        username: 'MusicLover',
        rating: 4.5,
        comment: 'Great sound, comfortable fit. Battery life could be better.',
        createdAt: '2023-04-25T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Ultra HD Smart TV 55"',
    description: 'Crystal clear 4K Ultra HD Smart TV with built-in streaming apps and voice control. Experience entertainment like never before.',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    brand: 'VisionTech',
    rating: 4.6,
    stock: 20,
    createdAt: '2023-03-10T08:45:00Z',
    updatedAt: '2023-05-15T11:30:00Z',
    isNew: false,
    isFeatured: true,
    discount: 15,
    tags: ['tv', '4k', 'smart-tv'],
    reviews: [
      {
        id: '103',
        userId: 'user3',
        username: 'MovieBuff',
        rating: 5,
        comment: 'Picture quality is outstanding. Smart features work flawlessly.',
        createdAt: '2023-03-25T18:20:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Professional DSLR Camera',
    description: 'High-performance DSLR camera with 24.2MP sensor, 4K video recording, and advanced autofocus system. Perfect for photography enthusiasts.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Photography',
    brand: 'CaptureX',
    rating: 4.9,
    stock: 15,
    createdAt: '2023-05-05T09:20:00Z',
    updatedAt: '2023-05-25T16:40:00Z',
    isNew: true,
    isFeatured: true,
    discount: 0,
    tags: ['camera', 'dslr', 'professional'],
    reviews: [
      {
        id: '104',
        userId: 'user4',
        username: 'PhotoPro',
        rating: 5,
        comment: 'Exceptional image quality and handling. Worth every penny!',
        createdAt: '2023-05-10T11:45:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work hours.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Furniture',
    brand: 'ComfortPlus',
    rating: 4.5,
    stock: 30,
    createdAt: '2023-02-20T13:15:00Z',
    updatedAt: '2023-04-10T09:30:00Z',
    isNew: false,
    isFeatured: false,
    discount: 0,
    tags: ['furniture', 'office', 'ergonomic'],
    reviews: [
      {
        id: '105',
        userId: 'user5',
        username: 'OfficePro',
        rating: 4.5,
        comment: 'Very comfortable for long work days. Assembly was easy.',
        createdAt: '2023-03-05T10:20:00Z'
      }
    ]
  },
  {
    id: '5',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant and stylish design.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Wearables',
    brand: 'FitTech',
    rating: 4.7,
    stock: 50,
    createdAt: '2023-04-25T11:30:00Z',
    updatedAt: '2023-05-20T08:45:00Z',
    isNew: true,
    isFeatured: true,
    discount: 5,
    tags: ['fitness', 'smartwatch', 'wearable'],
    reviews: [
      {
        id: '106',
        userId: 'user6',
        username: 'FitnessFreak',
        rating: 5,
        comment: 'Tracks everything I need and battery lasts forever!',
        createdAt: '2023-05-01T15:10:00Z'
      },
      {
        id: '107',
        userId: 'user7',
        username: 'RunnerGirl',
        rating: 4.5,
        comment: 'Great for tracking runs, but the app could be more intuitive.',
        createdAt: '2023-05-05T09:30:00Z'
      }
    ]
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof Bluetooth speaker with 20-hour battery life and rich, immersive sound. Perfect for outdoor adventures.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    brand: 'SoundMaster',
    rating: 4.4,
    stock: 75,
    createdAt: '2023-03-15T14:20:00Z',
    updatedAt: '2023-04-20T10:15:00Z',
    isNew: false,
    isFeatured: false,
    discount: 0,
    tags: ['audio', 'bluetooth', 'portable'],
    reviews: [
      {
        id: '108',
        userId: 'user8',
        username: 'BeachLover',
        rating: 4,
        comment: 'Great sound for its size. Survived a beach trip with no issues!',
        createdAt: '2023-04-01T16:45:00Z'
      }
    ]
  },
  {
    id: '7',
    name: 'Professional Blender',
    description: 'High-performance blender with multiple speed settings, pulse function, and durable stainless steel blades. Perfect for smoothies and food prep.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Kitchen',
    brand: 'KitchenPro',
    rating: 4.3,
    stock: 40,
    createdAt: '2023-01-10T09:45:00Z',
    updatedAt: '2023-03-05T13:20:00Z',
    isNew: false,
    isFeatured: false,
    discount: 20,
    tags: ['kitchen', 'appliance', 'blender'],
    reviews: [
      {
        id: '109',
        userId: 'user9',
        username: 'ChefAtHome',
        rating: 4.5,
        comment: 'Powerful blender that handles everything I throw at it.',
        createdAt: '2023-02-15T11:30:00Z'
      }
    ]
  },
  {
    id: '8',
    name: 'Lightweight Laptop 15"',
    description: 'Ultra-thin and lightweight laptop with 15" display, 16GB RAM, 512GB SSD, and all-day battery life. Perfect for work and entertainment on the go.',
    price: 1099.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    brand: 'TechPro',
    rating: 4.7,
    stock: 25,
    createdAt: '2023-05-01T10:00:00Z',
    updatedAt: '2023-05-25T09:15:00Z',
    isNew: true,
    isFeatured: true,
    discount: 0,
    tags: ['laptop', 'computer', 'portable'],
    reviews: [
      {
        id: '110',
        userId: 'user10',
        username: 'TechGeek',
        rating: 5,
        comment: 'Incredibly fast and lightweight. Battery lasts all day as promised!',
        createdAt: '2023-05-10T14:20:00Z'
      },
      {
        id: '111',
        userId: 'user11',
        username: 'DigitalNomad',
        rating: 4.5,
        comment: 'Perfect travel companion. Fast, reliable, and great display.',
        createdAt: '2023-05-15T08:30:00Z'
      }
    ]
  },
  {
    id: '9',
    name: 'Organic Cotton Bedding Set',
    description: 'Luxurious 100% organic cotton bedding set including duvet cover, fitted sheet, and pillowcases. Soft, breathable, and eco-friendly.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Home',
    brand: 'EcoHome',
    rating: 4.6,
    stock: 35,
    createdAt: '2023-02-15T11:20:00Z',
    updatedAt: '2023-04-05T14:30:00Z',
    isNew: false,
    isFeatured: false,
    discount: 0,
    tags: ['bedding', 'organic', 'home'],
    reviews: [
      {
        id: '112',
        userId: 'user12',
        username: 'SleepWell',
        rating: 5,
        comment: 'So soft and comfortable! Best sheets I\'ve ever owned.',
        createdAt: '2023-03-10T19:45:00Z'
      }
    ]
  },
  {
    id: '10',
    name: 'Smart Home Security System',
    description: 'Comprehensive home security system with cameras, motion sensors, and smartphone integration. Easy to install and monitor from anywhere.',
    price: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Smart Home',
    brand: 'SecureLife',
    rating: 4.5,
    stock: 20,
    createdAt: '2023-04-10T13:45:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    isNew: true,
    isFeatured: false,
    discount: 10,
    tags: ['security', 'smart-home', 'cameras'],
    reviews: [
      {
        id: '113',
        userId: 'user13',
        username: 'SafetyFirst',
        rating: 4.5,
        comment: 'Easy to set up and the app works great. Gives peace of mind when away from home.',
        createdAt: '2023-04-25T16:20:00Z'
      }
    ]
  },
  {
    id: '11',
    name: 'Stainless Steel Cookware Set',
    description: '10-piece stainless steel cookware set including pots, pans, and lids. Durable, dishwasher-safe, and suitable for all cooktops.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-a8514f9acfc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Kitchen',
    brand: 'KitchenPro',
    rating: 4.4,
    stock: 30,
    createdAt: '2023-03-01T09:30:00Z',
    updatedAt: '2023-04-15T11:20:00Z',
    isNew: false,
    isFeatured: false,
    discount: 15,
    tags: ['kitchen', 'cookware', 'stainless-steel'],
    reviews: [
      {
        id: '114',
        userId: 'user14',
        username: 'HomeCook',
        rating: 4.5,
        comment: 'Great quality cookware that heats evenly. Easy to clean too!',
        createdAt: '2023-03-20T12:15:00Z'
      }
    ]
  },
  {
    id: '12',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting, programmable buttons, and ultra-fast response time.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Gaming',
    brand: 'GameMaster',
    rating: 4.8,
    stock: 45,
    createdAt: '2023-04-20T15:30:00Z',
    updatedAt: '2023-05-20T09:45:00Z',
    isNew: true,
    isFeatured: false,
    discount: 0,
    tags: ['gaming', 'mouse', 'wireless'],
    reviews: [
      {
        id: '115',
        userId: 'user15',
        username: 'ProGamer',
        rating: 5,
        comment: 'Perfect precision and no lag at all. Battery life is impressive too.',
        createdAt: '2023-05-01T20:30:00Z'
      }
    ]
  },
  {
    id: '13',
    name: 'Yoga Mat Premium',
    description: 'Extra thick eco-friendly yoga mat with alignment lines, non-slip surface, and carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Fitness',
    brand: 'ZenFit',
    rating: 4.6,
    stock: 60,
    createdAt: '2023-02-25T10:15:00Z',
    updatedAt: '2023-04-10T13:40:00Z',
    isNew: false,
    isFeatured: false,
    discount: 10,
    tags: ['yoga', 'fitness', 'exercise'],
    reviews: [
      {
        id: '116',
        userId: 'user16',
        username: 'YogaLover',
        rating: 4.5,
        comment: 'Great thickness and grip. The alignment lines are very helpful!',
        createdAt: '2023-03-15T11:20:00Z'
      }
    ]
  },
  {
    id: '14',
    name: 'Mechanical Keyboard',
    description: 'Professional mechanical keyboard with customizable RGB backlighting, N-key rollover, and durable switches rated for 50 million keystrokes.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    brand: 'TechPro',
    rating: 4.7,
    stock: 40,
    createdAt: '2023-03-20T14:30:00Z',
    updatedAt: '2023-05-05T11:15:00Z',
    isNew: false,
    isFeatured: true,
    discount: 0,
    tags: ['keyboard', 'mechanical', 'gaming'],
    reviews: [
      {
        id: '117',
        userId: 'user17',
        username: 'CodeMaster',
        rating: 5,
        comment: 'The tactile feedback is perfect. Great for both gaming and typing!',
        createdAt: '2023-04-05T09:40:00Z'
      }
    ]
  },
  {
    id: '15',
    name: 'Air Purifier with HEPA Filter',
    description: 'Advanced air purifier with true HEPA filter, activated carbon filter, and air quality monitor. Removes 99.97% of airborne particles.',
    price: 179.99,
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Home',
    brand: 'CleanAir',
    rating: 4.5,
    stock: 25,
    createdAt: '2023-01-15T11:45:00Z',
    updatedAt: '2023-03-10T14:20:00Z',
    isNew: false,
    isFeatured: false,
    discount: 5,
    tags: ['air-purifier', 'home', 'health'],
    reviews: [
      {
        id: '118',
        userId: 'user18',
        username: 'AllergyFree',
        rating: 4.5,
        comment: 'Noticed a significant improvement in air quality. Much less dust and allergens!',
        createdAt: '2023-02-20T15:30:00Z'
      }
    ]
  }
];

/**
 * Helper function to filter products based on filter options
 * @param products - Array of products to filter
 * @param filters - Filter options to apply
 * @returns Filtered array of products
 */
export const filterMockProducts = (products: Product[], filters: any) => {
  let filtered = [...products];
  
  // Apply category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product => 
      filters.categories.includes(product.category)
    );
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(product => 
      product.price >= (filters.priceRange.min || 0) && 
      product.price <= (filters.priceRange.max || Infinity)
    );
  }
  
  // Apply rating filter
  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(product => 
      product.rating >= (filters.rating || 0)
    );
  }
  
  // Apply search query filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product => 
      product.tags?.some(tag => filters.tags.includes(tag))
    );
  }
  
  // Apply brands filter
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(product => 
      filters.brands.includes(product.brand || '')
    );
  }
  
  // Apply in-stock filter
  if (filters.inStock) {
    filtered = filtered.filter(product => product.stock > 0);
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case SortOption.PRICE_LOW_TO_HIGH:
        filtered.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_HIGH_TO_LOW:
        filtered.sort((a, b) => b.price - a.price);
        break;
      case SortOption.RATING_HIGH_TO_LOW:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case SortOption.NEWEST:
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case SortOption.POPULARITY:
        // Assuming higher rating and more reviews means more popular
        filtered.sort((a, b) => 
          (b.rating * (b.reviews?.length || 0)) - 
          (a.rating * (a.reviews?.length || 0))
        );
        break;
      default:
        break;
    }
  }
  
  return filtered;
};

/**
 * Helper function to paginate products
 * @param products - Array of products to paginate
 * @param page - Page number (1-based)
 * @param limit - Number of items per page
 * @returns Paginated array of products and metadata
 */
export const paginateMockProducts = (products: Product[], page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    page,
    limit,
    total: products.length
  };
};
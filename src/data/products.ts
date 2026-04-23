export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  brand: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Running Shoes',
    price: 99.99,
    description: 'High-performance running shoes with breathable mesh and responsive cushioning. Perfect for your daily runs or intense training sessions.',
    category: 'Footwear',
    brand: 'Velocity',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    price: 199.99,
    description: 'Noise-canceling over-ear headphones with superior sound quality and 40-hour battery life. Experience music like never before.',
    category: 'Electronics',
    brand: 'AudioTech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.8, count: 250 }
  },
  {
    id: '3',
    title: 'Smartwatch Series 5',
    price: 249.99,
    description: 'Track your fitness, receive notifications, and stay connected with this sleek and powerful smartwatch. Water-resistant up to 50m.',
    category: 'Electronics',
    brand: 'InnoWatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: '4',
    title: 'Casual Denim Jacket',
    price: 79.99,
    description: 'Classic denim jacket made from premium cotton. A versatile piece that adds a touch of style to any outfit.',
    category: 'Apparel',
    brand: 'UrbanWear',
    image: '/products/denim-jacket.png',
    rating: { rate: 4.3, count: 95 }
  },
  {
    id: '5',
    title: 'Canvas Backpack',
    price: 59.99,
    description: 'Durable and spacious backpack with multiple compartments and a padded laptop sleeve. Ideal for school, work, or travel.',
    category: 'Accessories',
    brand: 'TravelLog',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.7, count: 310 }
  },
  {
    id: '6',
    title: 'Digital Camera Z3',
    price: 499.99,
    description: 'Compact mirrorless camera with 24.2MP sensor and 4K video recording. Capture stunning photos and videos on the go.',
    category: 'Electronics',
    brand: 'SnapShot',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.9, count: 50 }
  },
  {
    id: '7',
    title: 'Modern Table Lamp',
    price: 45.00,
    description: 'Minimalist table lamp with adjustable brightness and color temperature. Perfect for your home office or bedside table.',
    category: 'Home',
    brand: 'Lumina',
    image: '/products/table-lamp.png',
    rating: { rate: 4.4, count: 140 }
  },
  {
    id: '8',
    title: 'Leather Wallet',
    price: 35.00,
    description: 'Handcrafted genuine leather wallet with RFID protection. Slim design with multiple card slots and a bill compartment.',
    category: 'Accessories',
    brand: 'Hide&Seek',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600',
    rating: { rate: 4.6, count: 220 }
  }
];

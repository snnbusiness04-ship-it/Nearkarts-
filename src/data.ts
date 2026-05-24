import { Shop, Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Grocery', iconName: 'ShoppingBasket', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'c2', name: 'Food', iconName: 'Utensils', color: 'bg-orange-100 text-orange-600' },
  { id: 'c3', name: 'Clothing', iconName: 'Shirt', color: 'bg-blue-100 text-blue-600' },
  { id: 'c4', name: 'Tech', iconName: 'Smartphone', color: 'bg-purple-100 text-purple-600' },
  { id: 'c5', name: 'Medical', iconName: 'Pill', color: 'bg-red-100 text-red-600' },
  { id: 'c6', name: 'Beauty', iconName: 'Sparkles', color: 'bg-pink-100 text-pink-600' },
  { id: 'c7', name: 'Shoes', iconName: 'Footprints', color: 'bg-cyan-100 text-cyan-600' },
];

export const TOP_RATED_SHOPS: Shop[] = [
  { id: 's1', name: 'Fresh Mart Supermarket', category: 'Grocery', rating: 4.8, reviewsCount: 1240, distance: '0.8 km', isOpen: true, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 's2', name: 'TechHaven Electronics', category: 'Tech', rating: 4.6, reviewsCount: 843, distance: '1.2 km', isOpen: true, imageUrl: 'https://images.unsplash.com/photo-1531297172864-74127ce90611?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 's3', name: 'Urban Style Boutique', category: 'Clothing', rating: 4.9, reviewsCount: 450, distance: '1.5 km', isOpen: false, imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400&h=300' },
  { id: 's4', name: 'CityCare Pharmacy', category: 'Medical', rating: 4.7, reviewsCount: 312, distance: '0.5 km', isOpen: true, imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400&h=300' },
];

export const TRENDING_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Bananas, 1kg', price: 60, originalPrice: 90, imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=300&h=300', shopName: 'Fresh Mart Supermarket', discountBadge: '33% OFF', isTrending: true },
  { id: 'p2', name: 'Wireless Earbuds Active NC', price: 1499, originalPrice: 2999, imageUrl: 'https://images.unsplash.com/photo-1572569533649-6532454a84e3?auto=format&fit=crop&q=80&w=300&h=300', shopName: 'TechHaven Electronics', discountBadge: '50% OFF', isTrending: true },
  { id: 'p3', name: 'Classic Cotton T-Shirt', price: 499, originalPrice: 999, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300&h=300', shopName: 'Urban Style Boutique', discountBadge: '50% OFF' },
  { id: 'p4', name: 'Fresh Red Apples, 1kg', price: 120, originalPrice: 150, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?auto=format&fit=crop&q=80&w=300&h=300', shopName: 'Fresh Mart Supermarket', discountBadge: '20% OFF' },
  { id: 'p5', name: 'Vitamin C Complex 500mg', price: 299, originalPrice: 450, imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d59b2983ba?auto=format&fit=crop&q=80&w=300&h=300', shopName: 'CityCare Pharmacy', discountBadge: '30% OFF', isTrending: true },
];

export const BANNERS = [
  { id: 'b1', title: 'Fresh Groceries Daily', subtitle: 'Up to 50% OFF nearby', color: 'from-emerald-500 to-teal-700', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=300&blend=000000&blend-mode=overlay&blend-alpha=50' },
  { id: 'b2', title: 'Electronics Mega Sale', subtitle: 'Flat 30% OFF instantly', color: 'from-blue-600 to-indigo-800', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600&h=300&blend=000000&blend-mode=overlay&blend-alpha=50' },
  { id: 'b3', title: 'Fashion Fiesta', subtitle: 'Buy 1 Get 1 Free', color: 'from-rose-500 to-pink-700', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600&h=300&blend=000000&blend-mode=overlay&blend-alpha=40' },
];

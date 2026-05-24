export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  imageUrl: string;
  reviewsCount: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  shopName: string;
  discountBadge?: string;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export type ViewState = 'auth' | 'home' | 'categories' | 'search' | 'orders' | 'account' | 'shop_dashboard';
export type UserRole = 'customer' | 'shop_owner' | 'admin';

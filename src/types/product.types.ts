/**
 * Product related type definitions
 */

// Product interface defining the structure of a product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviews?: Review[];
  stock: number;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  brand?: string;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Review interface for product reviews
export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Sort options for products
export enum SortOption {
  PRICE_LOW_TO_HIGH = 'price_asc',
  PRICE_HIGH_TO_LOW = 'price_desc',
  RATING_HIGH_TO_LOW = 'rating_desc',
  NEWEST = 'newest',
  POPULARITY = 'popularity'
}

// Filter options for products
export interface FilterOptions {
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  searchQuery?: string;
  sortBy?: SortOption;
  tags?: string[];
  brands?: string[];
  inStock?: boolean;
}

// Pagination state
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Product state for Redux store
export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
  pagination: PaginationState;
}

// API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductResponse {
  product: Product;
}

// API request types
export interface GetProductsParams extends FilterOptions {
  page?: number;
  limit?: number;
}
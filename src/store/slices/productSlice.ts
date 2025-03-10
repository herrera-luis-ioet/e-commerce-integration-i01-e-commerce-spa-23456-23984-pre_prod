import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  Product, 
  ProductState, 
  FilterOptions, 
  SortOption, 
  GetProductsParams,
  ProductsResponse,
  ProductResponse
} from '../../types/product.types';
import axios from 'axios';

// API base URL - replace with your actual API endpoint
const API_BASE_URL = '/api';

// Async thunks for API operations
export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  GetProductsParams | undefined
>('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products`, { 
      params 
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchProductById = createAsyncThunk<
  ProductResponse,
  string
>('products/fetchProductById', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProductResponse>(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

// Initial state
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filterOptions: {
    sortBy: SortOption.NEWEST,
    searchQuery: '',
    categories: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    tags: [],
    brands: [],
    inStock: false
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  }
};

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set all products
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    
    // Set selected product
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    
    // Update filter options
    setFilterOptions: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },
    
    // Apply filters to products
    applyFilters: (state) => {
      const { filterOptions } = state;
      let filtered = [...state.products];
      
      // Apply category filter
      if (filterOptions.categories && filterOptions.categories.length > 0) {
        filtered = filtered.filter(product => 
          filterOptions.categories?.includes(product.category)
        );
      }
      
      // Apply price range filter
      if (filterOptions.priceRange) {
        filtered = filtered.filter(product => 
          product.price >= (filterOptions.priceRange?.min || 0) && 
          product.price <= (filterOptions.priceRange?.max || Infinity)
        );
      }
      
      // Apply rating filter
      if (filterOptions.rating && filterOptions.rating > 0) {
        filtered = filtered.filter(product => 
          product.rating >= (filterOptions.rating || 0)
        );
      }
      
      // Apply search query filter
      if (filterOptions.searchQuery) {
        const query = filterOptions.searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      // Apply tags filter
      if (filterOptions.tags && filterOptions.tags.length > 0) {
        filtered = filtered.filter(product => 
          product.tags?.some(tag => filterOptions.tags?.includes(tag))
        );
      }
      
      // Apply brands filter
      if (filterOptions.brands && filterOptions.brands.length > 0) {
        filtered = filtered.filter(product => 
          filterOptions.brands?.includes(product.brand || '')
        );
      }
      
      // Apply in-stock filter
      if (filterOptions.inStock) {
        filtered = filtered.filter(product => product.stock > 0);
      }
      
      // Apply sorting
      if (filterOptions.sortBy) {
        switch (filterOptions.sortBy) {
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
      
      state.filteredProducts = filtered;
      state.pagination.totalItems = filtered.length;
      state.pagination.totalPages = Math.ceil(
        filtered.length / state.pagination.itemsPerPage
      );
    },
    
    // Update pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.totalPages = Math.ceil(
        state.filteredProducts.length / action.payload
      );
      // Reset to first page when changing items per page
      state.pagination.currentPage = 1;
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filterOptions = initialState.filterOptions;
      state.filteredProducts = state.products;
      state.pagination.currentPage = 1;
      state.pagination.totalItems = state.products.length;
      state.pagination.totalPages = Math.ceil(
        state.products.length / state.pagination.itemsPerPage
      );
    },
    
    // Clear error state
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.filteredProducts = action.payload.products;
        state.pagination.totalItems = action.payload.total;
        state.pagination.totalPages = Math.ceil(
          action.payload.total / state.pagination.itemsPerPage
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch products';
      })
      
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch product details';
      });
  }
});

// Export actions
export const { 
  setProducts, 
  setSelectedProduct, 
  setFilterOptions, 
  applyFilters, 
  setCurrentPage, 
  setItemsPerPage, 
  resetFilters, 
  clearError 
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;
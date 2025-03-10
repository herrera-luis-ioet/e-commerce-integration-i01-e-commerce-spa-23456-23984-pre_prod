import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  fetchProducts, 
  fetchProductById,
  setFilterOptions, 
  applyFilters, 
  setCurrentPage, 
  setItemsPerPage,
  resetFilters
} from '../store/slices/productSlice';
import { FilterOptions, SortOption } from '../types/product.types';

/**
 * Custom hook for managing product catalog functionality
 * Provides methods for fetching, filtering, sorting, and pagination of products
 */
export const useProductCatalog = () => {
  const dispatch = useAppDispatch();
  const { 
    products, 
    filteredProducts, 
    selectedProduct, 
    loading, 
    error, 
    filterOptions, 
    pagination 
  } = useAppSelector(state => state.products);

  // Fetch products on initial load
  useEffect(() => {
    if (!products || (Array.isArray(products) && products.length === 0 && !loading)) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products, loading]);

  /**
   * Fetch a specific product by ID
   * @param id - The product ID to fetch
   */
  const getProductById = useCallback((id: string) => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  /**
   * Update filter options and apply filters
   * @param newFilters - The filter options to apply
   */
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    dispatch(setFilterOptions(newFilters));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Set the search query and apply filters
   * @param query - The search query string
   */
  const searchProducts = useCallback((query: string) => {
    dispatch(setFilterOptions({ searchQuery: query }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Filter products by category
   * @param categories - Array of category names to filter by
   */
  const filterByCategory = useCallback((categories: string[]) => {
    dispatch(setFilterOptions({ categories }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Filter products by brand
   * @param brands - Array of brand names to filter by
   */
  const filterByBrand = useCallback((brands: string[]) => {
    dispatch(setFilterOptions({ brands }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Filter products by price range
   * @param min - Minimum price
   * @param max - Maximum price
   */
  const filterByPriceRange = useCallback((min: number, max: number) => {
    dispatch(setFilterOptions({ priceRange: { min, max } }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Filter products by minimum rating
   * @param rating - Minimum rating value
   */
  const filterByRating = useCallback((rating: number) => {
    dispatch(setFilterOptions({ rating }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Sort products by the specified option
   * @param sortBy - The sort option to apply
   */
  const sortProducts = useCallback((sortBy: SortOption) => {
    dispatch(setFilterOptions({ sortBy }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Filter products by availability (in stock)
   * @param inStock - Whether to show only in-stock products
   */
  const filterByStock = useCallback((inStock: boolean) => {
    dispatch(setFilterOptions({ inStock }));
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Reset all filters to their default values
   */
  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
    dispatch(applyFilters());
  }, [dispatch]);

  /**
   * Update the current page in pagination
   * @param page - The page number to navigate to
   */
  const goToPage = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);

  /**
   * Update the number of items displayed per page
   * @param itemsPerPage - Number of items to show per page
   */
  const changeItemsPerPage = useCallback((itemsPerPage: number) => {
    dispatch(setItemsPerPage(itemsPerPage));
  }, [dispatch]);

  /**
   * Refresh product data by fetching from API again
   */
  const refreshProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Ensure we always return valid data structures even if the state is not fully initialized
  return {
    // State
    products: products || [],
    filteredProducts: filteredProducts || [],
    selectedProduct,
    loading,
    error,
    filterOptions: filterOptions || {},
    pagination: pagination || { currentPage: 1, totalPages: 1, itemsPerPage: 10, totalItems: 0 },
    
    // Actions
    getProductById,
    updateFilters,
    searchProducts,
    filterByCategory,
    filterByBrand,
    filterByPriceRange,
    filterByRating,
    filterByStock,
    sortProducts,
    clearFilters,
    goToPage,
    changeItemsPerPage,
    refreshProducts
  };
};

export default useProductCatalog;

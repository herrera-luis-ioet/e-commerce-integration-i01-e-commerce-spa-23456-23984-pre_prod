/**
 * Product Service
 * Provides methods for interacting with the product API endpoints
 */

import apiClient, { handleApiError } from './api';
import {
  Product,
  ProductsResponse,
  ProductResponse,
  GetProductsParams,
  FilterOptions,
  SortOption
} from '../types/product.types';

/**
 * Product Service with methods for fetching and managing products
 */
const productService = {
  // PUBLIC_INTERFACE
  /**
   * Fetch products with optional filtering, sorting, and pagination
   * @param params - Optional parameters for filtering, sorting, and pagination
   * @returns Promise with products response data
   */
  getProducts: async (params?: GetProductsParams): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Fetch a single product by ID
   * @param productId - The ID of the product to fetch
   * @returns Promise with product response data
   */
  getProductById: async (productId: string): Promise<ProductResponse> => {
    try {
      const response = await apiClient.get<ProductResponse>(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Search products by query string
   * @param query - The search query
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  searchProducts: async (query: string, page?: number, limit?: number): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products/search', {
        params: { query, page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Filter products by various criteria
   * @param filterOptions - Options for filtering products
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  filterProducts: async (
    filterOptions: FilterOptions,
    page?: number,
    limit?: number
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: {
          ...filterOptions,
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get products by category
   * @param category - The category to filter by
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  getProductsByCategory: async (
    category: string,
    page?: number,
    limit?: number
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { categories: [category], page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get products sorted by the specified option
   * @param sortOption - The sort option to apply
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  getSortedProducts: async (
    sortOption: SortOption,
    page?: number,
    limit?: number
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { sortBy: sortOption, page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get featured products
   * @param limit - Optional limit of items to return
   * @returns Promise with products response data
   */
  getFeaturedProducts: async (limit?: number): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products/featured', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get new products
   * @param limit - Optional limit of items to return
   * @returns Promise with products response data
   */
  getNewProducts: async (limit?: number): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { isNew: true, sortBy: SortOption.NEWEST, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get products by brand
   * @param brand - The brand to filter by
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  getProductsByBrand: async (
    brand: string,
    page?: number,
    limit?: number
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { brands: [brand], page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get products by tag
   * @param tag - The tag to filter by
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  getProductsByTag: async (
    tag: string,
    page?: number,
    limit?: number
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { tags: [tag], page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Get products on sale (with discount)
   * @param page - Optional page number for pagination
   * @param limit - Optional limit of items per page
   * @returns Promise with products response data
   */
  getProductsOnSale: async (page?: number, limit?: number): Promise<ProductsResponse> => {
    try {
      // Assuming the API supports filtering by discount > 0
      const response = await apiClient.get<ProductsResponse>('/products/sale', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

export default productService;
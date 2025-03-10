/**
 * Tests for Product Service
 * 
 * This file contains comprehensive tests for the productService.ts module,
 * testing all service methods with success and error scenarios.
 */

import productService from '../productService';
import { mockProducts } from '../mockData';
import { FilterOptions, ProductsResponse, ProductResponse, SortOption } from '../../types/product.types';

// Mock axios module
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    })),
    isAxiosError: jest.fn()
  };
});

// Mock the API module
jest.mock('../api', () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    },
    handleApiError: jest.fn((error) => {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred';
    })
  };
});

// Get the mocked API client
import apiClient, { handleApiError } from '../api';
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;
const mockedHandleApiError = handleApiError as jest.MockedFunction<typeof handleApiError>;

describe('Product Service', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock response data
  const mockProductsResponse: ProductsResponse = {
    products: mockProducts.slice(0, 5),
    total: 5,
    page: 1,
    limit: 10
  };

  const mockProductResponse: ProductResponse = {
    product: mockProducts[0]
  };

  describe('getProducts', () => {
    test('should fetch products successfully', async () => {
      // Arrange
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProducts();
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { params: undefined });
      expect(result).toEqual(mockProductsResponse);
      expect(result.products.length).toBe(5);
    });

    test('should fetch products with pagination parameters', async () => {
      // Arrange
      const params = { page: 2, limit: 5 };
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProducts(params);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { params });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching products fails', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      mockedApiClient.get.mockRejectedValueOnce(new Error(errorMessage));
      mockedHandleApiError.mockReturnValueOnce(errorMessage);
      
      // Act & Assert
      await expect(productService.getProducts()).rejects.toThrow(errorMessage);
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { params: undefined });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });

    test('should handle API error response', async () => {
      // Arrange
      const errorResponse = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { message: 'Server error occurred' }
        }
      };
      mockedApiClient.get.mockRejectedValueOnce(errorResponse);
      mockedHandleApiError.mockReturnValueOnce('Server error occurred');
      
      // Act & Assert
      await expect(productService.getProducts()).rejects.toThrow('Server error occurred');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { params: undefined });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    test('should fetch a product by ID successfully', async () => {
      // Arrange
      const productId = '1';
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductResponse });
      
      // Act
      const result = await productService.getProductById(productId);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith(`/products/${productId}`);
      expect(result).toEqual(mockProductResponse);
      expect(result.product.id).toBe('1');
    });

    test('should handle error when fetching product by ID fails', async () => {
      // Arrange
      const productId = 'invalid-id';
      const errorResponse = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Product not found' }
        }
      };
      mockedApiClient.get.mockRejectedValueOnce(errorResponse);
      mockedHandleApiError.mockReturnValueOnce('Product not found');
      
      // Act & Assert
      await expect(productService.getProductById(productId)).rejects.toThrow('Product not found');
      expect(mockedApiClient.get).toHaveBeenCalledWith(`/products/${productId}`);
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('searchProducts', () => {
    test('should search products successfully', async () => {
      // Arrange
      const query = 'headphones';
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.searchProducts(query);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/search', { 
        params: { query, page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should search products with pagination', async () => {
      // Arrange
      const query = 'headphones';
      const page = 2;
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.searchProducts(query, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/search', { 
        params: { query, page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when searching products fails', async () => {
      // Arrange
      const query = 'headphones';
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.searchProducts(query)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/search', { 
        params: { query, page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('filterProducts', () => {
    test('should filter products successfully', async () => {
      // Arrange
      const filterOptions: FilterOptions = {
        categories: ['Electronics'],
        priceRange: { min: 100, max: 500 }
      };
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.filterProducts(filterOptions);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { ...filterOptions, page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should filter products with pagination', async () => {
      // Arrange
      const filterOptions: FilterOptions = {
        categories: ['Electronics'],
        rating: 4
      };
      const page = 1;
      const limit = 10;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.filterProducts(filterOptions, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { ...filterOptions, page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when filtering products fails', async () => {
      // Arrange
      const filterOptions: FilterOptions = {
        categories: ['Electronics']
      };
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.filterProducts(filterOptions)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { ...filterOptions, page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getProductsByCategory', () => {
    test('should fetch products by category successfully', async () => {
      // Arrange
      const category = 'Electronics';
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByCategory(category);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { categories: [category], page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch products by category with pagination', async () => {
      // Arrange
      const category = 'Electronics';
      const page = 1;
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByCategory(category, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { categories: [category], page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching products by category fails', async () => {
      // Arrange
      const category = 'InvalidCategory';
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getProductsByCategory(category)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { categories: [category], page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getSortedProducts', () => {
    test('should fetch sorted products successfully', async () => {
      // Arrange
      const sortOption = SortOption.PRICE_LOW_TO_HIGH;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getSortedProducts(sortOption);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { sortBy: sortOption, page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch sorted products with pagination', async () => {
      // Arrange
      const sortOption = SortOption.RATING_HIGH_TO_LOW;
      const page = 2;
      const limit = 10;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getSortedProducts(sortOption, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { sortBy: sortOption, page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching sorted products fails', async () => {
      // Arrange
      const sortOption = SortOption.NEWEST;
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getSortedProducts(sortOption)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { sortBy: sortOption, page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getFeaturedProducts', () => {
    test('should fetch featured products successfully', async () => {
      // Arrange
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getFeaturedProducts();
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/featured', { 
        params: { limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch featured products with limit', async () => {
      // Arrange
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getFeaturedProducts(limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/featured', { 
        params: { limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching featured products fails', async () => {
      // Arrange
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getFeaturedProducts()).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/featured', { 
        params: { limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getNewProducts', () => {
    test('should fetch new products successfully', async () => {
      // Arrange
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getNewProducts();
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { isNew: true, sortBy: SortOption.NEWEST, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch new products with limit', async () => {
      // Arrange
      const limit = 3;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getNewProducts(limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { isNew: true, sortBy: SortOption.NEWEST, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching new products fails', async () => {
      // Arrange
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getNewProducts()).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { isNew: true, sortBy: SortOption.NEWEST, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getProductsByBrand', () => {
    test('should fetch products by brand successfully', async () => {
      // Arrange
      const brand = 'SoundMaster';
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByBrand(brand);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { brands: [brand], page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch products by brand with pagination', async () => {
      // Arrange
      const brand = 'SoundMaster';
      const page = 1;
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByBrand(brand, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { brands: [brand], page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching products by brand fails', async () => {
      // Arrange
      const brand = 'InvalidBrand';
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getProductsByBrand(brand)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { brands: [brand], page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getProductsByTag', () => {
    test('should fetch products by tag successfully', async () => {
      // Arrange
      const tag = 'wireless';
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByTag(tag);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { tags: [tag], page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch products by tag with pagination', async () => {
      // Arrange
      const tag = 'wireless';
      const page = 1;
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsByTag(tag, page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { tags: [tag], page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching products by tag fails', async () => {
      // Arrange
      const tag = 'InvalidTag';
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getProductsByTag(tag)).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products', { 
        params: { tags: [tag], page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });

  describe('getProductsOnSale', () => {
    test('should fetch products on sale successfully', async () => {
      // Arrange
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsOnSale();
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/sale', { 
        params: { page: undefined, limit: undefined } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should fetch products on sale with pagination', async () => {
      // Arrange
      const page = 1;
      const limit = 5;
      mockedApiClient.get.mockResolvedValueOnce({ data: mockProductsResponse });
      
      // Act
      const result = await productService.getProductsOnSale(page, limit);
      
      // Assert
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/sale', { 
        params: { page, limit } 
      });
      expect(result).toEqual(mockProductsResponse);
    });

    test('should handle error when fetching products on sale fails', async () => {
      // Arrange
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));
      mockedHandleApiError.mockReturnValueOnce('Network Error');
      
      // Act & Assert
      await expect(productService.getProductsOnSale()).rejects.toThrow('Network Error');
      expect(mockedApiClient.get).toHaveBeenCalledWith('/products/sale', { 
        params: { page: undefined, limit: undefined } 
      });
      expect(mockedHandleApiError).toHaveBeenCalled();
    });
  });
});

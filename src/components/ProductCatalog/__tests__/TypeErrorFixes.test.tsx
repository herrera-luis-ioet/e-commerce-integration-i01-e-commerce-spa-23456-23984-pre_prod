import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCatalog from '../index';
import productReducer from '../../../store/slices/productSlice';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      products: productReducer
    },
    preloadedState: {
      products: {
        products: [],
        filteredProducts: [],
        selectedProduct: null,
        loading: false,
        error: null,
        filterOptions: {},
        pagination: {
          currentPage: 1,
          totalPages: 1,
          itemsPerPage: 10,
          totalItems: 0
        },
        ...initialState
      }
    }
  });
};

describe('TypeError Fixes Tests', () => {
  test('should handle undefined products array', () => {
    const store = createMockStore({ products: undefined });
    
    render(
      <Provider store={store}>
        <ProductCatalog />
      </Provider>
    );
    
    // If the fix is working, this should not throw an error
    // Debug what's actually in the DOM
    screen.debug();
    // Use a more general assertion to check if the component renders without errors
    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
  });

  test('should handle null products array', () => {
    const store = createMockStore({ products: null });
    
    render(
      <Provider store={store}>
        <ProductCatalog />
      </Provider>
    );
    
    // If the fix is working, this should not throw an error
    // Use a more general assertion to check if the component renders without errors
    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
  });

  test('should handle empty products array', () => {
    const store = createMockStore({ products: [] });
    
    render(
      <Provider store={store}>
        <ProductCatalog />
      </Provider>
    );
    
    // If the fix is working, this should not throw an error
    // Use a more general assertion to check if the component renders without errors
    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
  });

  test('should handle undefined filteredProducts', () => {
    const store = createMockStore({ filteredProducts: undefined });
    
    render(
      <Provider store={store}>
        <ProductCatalog />
      </Provider>
    );
    
    // If the fix is working, this should not throw an error
    // Use a more general assertion to check if the component renders without errors
    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
  });

  test('should handle loading state with undefined products', () => {
    const store = createMockStore({ 
      products: undefined,
      loading: true 
    });
    
    render(
      <Provider store={store}>
        <ProductCatalog />
      </Provider>
    );
    
    // If the fix is working, this should not throw an error and show loading message
    expect(screen.getAllByText(/Loading products/i)[0]).toBeInTheDocument();
  });
});

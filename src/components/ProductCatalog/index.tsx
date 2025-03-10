import { useEffect, useState } from 'react';
import { Product } from '../../types/product.types';
import useProductCatalog from '../../hooks/useProductCatalog';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';

interface ProductCatalogProps {
  title?: string;
  showFilters?: boolean;
  className?: string;
  onProductSelect?: (product: Product) => void;
  initialCategory?: string;
  initialBrand?: string;
  initialSearchQuery?: string;
}

/**
 * ProductCatalog is the main container component that combines all product catalog components
 * 
 * @param title - Optional title for the catalog
 * @param showFilters - Whether to show the filter sidebar
 * @param className - Additional CSS classes
 * @param onProductSelect - Callback when a product is selected
 * @param initialCategory - Initial category to filter by
 * @param initialBrand - Initial brand to filter by
 * @param initialSearchQuery - Initial search query
 */
const ProductCatalog: React.FC<ProductCatalogProps> = ({
  title = 'Product Catalog',
  showFilters = true,
  className = '',
  onProductSelect,
  initialCategory,
  initialBrand,
  initialSearchQuery
}) => {
  const {
    filteredProducts,
    loading,
    error,
    updateFilters,
    refreshProducts,
    products,
    pagination,
    goToPage
  } = useProductCatalog();
  
  // Extract unique categories and brands for filters
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  
  // Set initial filters if provided
  useEffect(() => {
    const initialFilters: Record<string, any> = {};
    
    if (initialCategory) {
      initialFilters.categories = [initialCategory];
    }
    
    if (initialBrand) {
      initialFilters.brands = [initialBrand];
    }
    
    if (initialSearchQuery) {
      initialFilters.searchQuery = initialSearchQuery;
    }
    
    if (Object.keys(initialFilters).length > 0) {
      updateFilters(initialFilters);
    }
  }, [initialCategory, initialBrand, initialSearchQuery, updateFilters]);
  
  // Extract unique categories and brands from products
  useEffect(() => {
    if (products && Array.isArray(products) && products.length > 0) {
      const categories = Array.from(new Set(products.map(p => p.category)));
      const brands = Array.from(new Set(products.filter(p => p.brand).map(p => p.brand as string)));
      
      setAvailableCategories(categories);
      setAvailableBrands(brands);
    }
  }, [products]);
  
  // Handle product selection
  const handleProductClick = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };
  
  // Handle pagination
  const renderPagination = () => {
    const { currentPage, totalPages } = pagination || { currentPage: 1, totalPages: 1 };
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  pageNum === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className={`bg-gray-100 min-h-screen ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">
            {loading ? 'Loading products...' : `${filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0} products available`}
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full md:w-1/4 lg:w-1/5">
              <ProductFilter
                availableCategories={availableCategories || []}
                availableBrands={availableBrands || []}
              />
            </aside>
          )}
          
          {/* Main Content */}
          <main className={`flex-1 ${showFilters ? '' : 'w-full'}`}>
            {/* Error with retry button */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      type="button"
                      className="bg-red-100 text-red-500 hover:bg-red-200 px-2 py-1 rounded text-sm"
                      onClick={refreshProducts}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product List */}
            <ProductList
              products={filteredProducts && Array.isArray(filteredProducts) ? filteredProducts : []}
              loading={loading}
              error={error}
              onProductClick={handleProductClick}
            />
            
            {/* Pagination */}
            {renderPagination()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;

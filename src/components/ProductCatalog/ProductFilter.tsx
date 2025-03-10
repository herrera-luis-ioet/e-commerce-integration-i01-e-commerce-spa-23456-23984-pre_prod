import React, { useState } from 'react';
import { FilterOptions, SortOption } from '../../types/product.types';
import useProductCatalog from '../../hooks/useProductCatalog';

interface ProductFilterProps {
  className?: string;
  availableCategories?: string[];
  availableBrands?: string[];
  onFilterChange?: (filters: FilterOptions) => void;
}

/**
 * ProductFilter component provides UI for filtering and sorting products
 * 
 * @param className - Additional CSS classes
 * @param availableCategories - List of available categories to filter by
 * @param availableBrands - List of available brands to filter by
 * @param onFilterChange - Optional callback when filters change
 */
const ProductFilter: React.FC<ProductFilterProps> = ({
  className = '',
  availableCategories = [],
  availableBrands = [],
  onFilterChange
}) => {
  const { filterOptions, updateFilters, clearFilters } = useProductCatalog();
  
  // Local state for form inputs
  const [searchQuery, setSearchQuery] = useState(filterOptions.searchQuery || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filterOptions.categories || []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(filterOptions.brands || []);
  const [minPrice, setMinPrice] = useState<number>(filterOptions.priceRange?.min || 0);
  const [maxPrice, setMaxPrice] = useState<number>(filterOptions.priceRange?.max || 1000);
  const [rating, setRating] = useState<number>(filterOptions.rating || 0);
  const [sortBy, setSortBy] = useState<SortOption>(filterOptions.sortBy || SortOption.NEWEST);
  const [inStock, setInStock] = useState<boolean>(filterOptions.inStock || false);
  
  // Apply filters when form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFilters: FilterOptions = {
      searchQuery,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      priceRange: { min: minPrice, max: maxPrice },
      rating: rating > 0 ? rating : undefined,
      sortBy,
      inStock: inStock || undefined
    };
    
    updateFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setRating(0);
    setSortBy(SortOption.NEWEST);
    setInStock(false);
    
    clearFilters();
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Search */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
        </div>
        
        {/* Sort By */}
        <div className="mb-4">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort products by"
          >
            <option value={SortOption.NEWEST}>Newest</option>
            <option value={SortOption.PRICE_LOW_TO_HIGH}>Price: Low to High</option>
            <option value={SortOption.PRICE_HIGH_TO_LOW}>Price: High to Low</option>
            <option value={SortOption.RATING_HIGH_TO_LOW}>Highest Rated</option>
            <option value={SortOption.POPULARITY}>Popularity</option>
          </select>
        </div>
        
        {/* Price Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="min-price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              aria-label="Minimum price"
            />
            <span>to</span>
            <input
              type="number"
              id="max-price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price"
            />
          </div>
        </div>
        
        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="rating"
              className="w-full"
              min="0"
              max="5"
              step="1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              aria-label="Minimum rating"
            />
            <span className="ml-2">{rating > 0 ? `${rating}+ stars` : 'Any'}</span>
          </div>
        </div>
        
        {/* In Stock Only */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="in-stock"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              aria-label="In stock only"
            />
            <label htmlFor="in-stock" className="ml-2 block text-sm text-gray-700">
              In Stock Only
            </label>
          </div>
        </div>
        
        {/* Categories */}
        {availableCategories.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Categories</h3>
            <div className="max-h-40 overflow-y-auto">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    aria-label={`Category: ${category}`}
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Brands */}
        {availableBrands.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Brands</h3>
            <div className="max-h-40 overflow-y-auto">
              {availableBrands.map((brand) => (
                <div key={brand} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    aria-label={`Brand: ${brand}`}
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 block text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Apply filters"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;

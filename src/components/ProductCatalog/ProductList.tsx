import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeGrid } from 'react-window';
import { Product } from '../../types/product.types';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onProductClick?: (product: Product) => void;
  className?: string;
  gridGap?: number;
  itemWidth?: number;
  itemHeight?: number;
}

/**
 * ProductList component renders a virtualized grid of ProductCard components
 * Uses react-window for efficient rendering of large lists
 * 
 * @param products - Array of products to display
 * @param loading - Whether products are currently loading
 * @param error - Error message if product loading failed
 * @param onProductClick - Callback when a product is clicked
 * @param className - Additional CSS classes
 * @param gridGap - Gap between grid items in pixels
 * @param itemWidth - Width of each product card in pixels
 * @param itemHeight - Height of each product card in pixels
 */
const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  error = null,
  onProductClick,
  className = '',
  gridGap = 16,
  itemWidth = 280,
  itemHeight = 400
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [columnCount, setColumnCount] = useState(4);

  // Update dimensions and column count on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const columns = Math.max(1, Math.floor(width / (itemWidth + gridGap)));
        
        setDimensions({ width, height });
        setColumnCount(columns);
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [itemWidth, gridGap]);

  // Calculate row count based on number of products and columns
  const rowCount = Math.ceil(products.length / columnCount);

  // Render each cell in the grid
  const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
    const index = rowIndex * columnCount + columnIndex;
    
    // Return empty cell if index is out of bounds
    if (index >= products.length) {
      return <div style={style} />;
    }
    
    const product = products[index];
    
    // Adjust style to account for grid gap
    const adjustedStyle = {
      ...style,
      left: Number(style.left) + gridGap * columnIndex,
      top: Number(style.top) + gridGap * rowIndex,
      width: Number(style.width) - gridGap,
      height: Number(style.height) - gridGap
    };
    
    return (
      <div style={adjustedStyle}>
        <ProductCard 
          product={product} 
          onClick={onProductClick}
        />
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <Loader size="large" text="Loading products..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (products.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <p className="text-gray-500 mb-2">No products found</p>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full min-h-[600px] ${className}`}
      data-testid="product-list"
      aria-label={`Product list containing ${products.length} items`}
    >
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={itemWidth}
        height={Math.min(dimensions.height, rowCount * (itemHeight + gridGap))}
        rowCount={rowCount}
        rowHeight={itemHeight}
        width={dimensions.width}
        itemData={products}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};

export default ProductList;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCatalog from '../components/ProductCatalog';
import { Product } from '../types/product.types';

/**
 * ProductCatalogPage is the main page for displaying the product catalog
 * It uses the ProductCatalog component and handles navigation to product details
 */
const ProductCatalogPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle product selection to navigate to product detail page
  const handleProductSelect = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-catalog-page">
      <ProductCatalog 
        title="Our Products" 
        showFilters={true}
        onProductSelect={handleProductSelect}
      />
    </div>
  );
};

export default ProductCatalogPage;
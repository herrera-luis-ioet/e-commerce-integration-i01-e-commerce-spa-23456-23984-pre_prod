import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductCatalogPage from '../pages/ProductCatalogPage';
import ProductDetailPage from '../pages/ProductDetailPage';

/**
 * AppRoutes component defines all the routes for the application
 * using React Router's Routes and Route components
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<ProductCatalogPage />} />
      <Route path="/products" element={<ProductCatalogPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      
      {/* Fallback route - redirect to home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
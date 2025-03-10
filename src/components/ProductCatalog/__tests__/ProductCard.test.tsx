import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Product } from '../../../types/product.types';

// Mock product data for testing
const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product description',
  price: 99.99,
  imageUrl: '/test-image.jpg',
  category: 'Electronics',
  rating: 4.5,
  stock: 10,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  brand: 'Test Brand',
  discount: 10,
  isNew: true,
  isFeatured: true
};

// Mock product with no discount
const mockProductNoDiscount: Product = {
  ...mockProduct,
  id: '2',
  discount: 0,
  isNew: false,
  isFeatured: false
};

// Mock product out of stock
const mockProductOutOfStock: Product = {
  ...mockProduct,
  id: '3',
  stock: 0
};

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check if product name is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check if product description is displayed
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    
    // Check if price is displayed correctly
    expect(screen.getByText('$89.99')).toBeInTheDocument(); // Discounted price
    expect(screen.getByText('$99.99')).toBeInTheDocument(); // Original price
    
    // Check if stock information is displayed
    expect(screen.getByText('10 in stock')).toBeInTheDocument();
    
    // Check if badges are displayed
    expect(screen.getByText('NEW')).toBeInTheDocument();
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
    expect(screen.getByText('10% OFF')).toBeInTheDocument();
  });

  test('renders product without discount correctly', () => {
    render(<ProductCard product={mockProductNoDiscount} />);
    
    // Check if only the original price is displayed (no discount)
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.queryByText('$89.99')).not.toBeInTheDocument();
    
    // Check that badges are not displayed
    expect(screen.queryByText('NEW')).not.toBeInTheDocument();
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
    expect(screen.queryByText('0% OFF')).not.toBeInTheDocument();
  });

  test('renders out of stock product correctly', () => {
    render(<ProductCard product={mockProductOutOfStock} />);
    
    // Check if out of stock message is displayed
    expect(screen.getAllByText('Out of Stock')[0]).toBeInTheDocument();
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ProductCard product={mockProduct} onClick={handleClick} />);
    
    // Click on the product card
    fireEvent.click(screen.getByRole('article'));
    
    // Check if onClick handler was called with the product
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });

  test('renders correct star rating', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check if rating text is displayed
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
    
    // Check if the correct number of SVG elements are rendered for the stars
    // This is a bit tricky to test directly, but we can check for the aria-label
    expect(screen.getByLabelText('Rating: 4.5 out of 5 stars')).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const { container } = render(<ProductCard product={mockProduct} className="custom-class" />);
    
    // Check if the custom class is applied
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

/**
 * Accessible loading spinner component
 * 
 * @param size - Size of the spinner: 'small', 'medium', or 'large'
 * @param color - Color theme of the spinner: 'primary', 'secondary', or 'white'
 * @param text - Optional text to display alongside the spinner
 * @param fullScreen - Whether the loader should take up the full screen
 * @param className - Additional CSS classes
 */
const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-2',
    large: 'w-12 h-12 border-4',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-blue-600 border-t-transparent',
    secondary: 'border-gray-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  // Container classes
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'
    : 'flex items-center justify-center';

  return (
    <div 
      className={`${containerClasses} ${className}`}
      role="status"
      aria-live="polite"
      data-testid="loader"
    >
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-hidden="true"
      />
      
      {text && (
        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {text}
        </span>
      )}
      
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">
        {text || 'Loading content'}
      </span>
    </div>
  );
};

export default Loader;
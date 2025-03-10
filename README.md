# Product Catalog Component

## Overview

A comprehensive React component for rendering product catalogs in e-commerce applications. This component provides a feature-rich, performant, and accessible way to display products with filtering, sorting, and detailed views.

The Product Catalog Component is designed to be easily integrated into any React-based e-commerce application, providing a seamless shopping experience for users while maintaining high performance standards even with large product datasets.

## Technologies Used

- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript
- **Frontend Framework**: [React.js](https://reactjs.org/) (v18+) - A JavaScript library for building user interfaces
- **State Management**: 
  - [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
  - [Redux Persist](https://github.com/rt2zz/redux-persist) - Persist and rehydrate a redux store
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and Node.js
- **Routing**: [React Router](https://reactrouter.com/) - Declarative routing for React
- **Performance Optimization**: 
  - [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) - Higher order component for component memoization
  - [react-window](https://github.com/bvaughn/react-window) - Virtualization for efficiently rendering large lists
- **Testing Framework**: 
  - [Jest](https://jestjs.io/) - JavaScript Testing Framework
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities for React
  - [Cypress](https://www.cypress.io/) - End-to-end testing framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- A code editor (recommended: [Visual Studio Code](https://code.visualstudio.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- **`npm run dev`**: Starts the development server using Vite
- **`npm run build`**: Compiles TypeScript and builds the project for production
- **`npm run lint`**: Runs ESLint to check for code quality issues
- **`npm run preview`**: Previews the built application locally
- **`npm test`**: Runs Jest tests

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── common/     # Shared components (e.g., Loader)
│   │   └── ProductCatalog/ # Product catalog specific components
│   │       ├── __tests__/  # Component tests
│   │       ├── index.tsx   # Main ProductCatalog component
│   │       ├── ProductCard.tsx  # Individual product display
│   │       ├── ProductFilter.tsx # Filtering functionality
│   │       └── ProductList.tsx  # List of products
│   ├── hooks/          # Custom React hooks
│   │   └── useProductCatalog.ts # Hook for product catalog functionality
│   ├── pages/          # Page components
│   │   ├── ProductCatalogPage.tsx # Page for product catalog
│   │   └── ProductDetailPage.tsx  # Page for product details
│   ├── routes/         # Routing configuration
│   ├── services/       # API services
│   │   ├── api.ts      # Base API configuration
│   │   └── productService.ts # Product-specific API calls
│   ├── store/          # Redux store configuration
│   │   ├── slices/     # Redux slices
│   │   │   └── productSlice.ts # Product-related state management
│   │   ├── hooks.ts    # Custom Redux hooks
│   │   └── index.ts    # Store configuration
│   ├── types/          # TypeScript type definitions
│   │   └── product.types.ts # Product-related types
│   ├── utils/          # Utility functions
│   ├── __mocks__/      # Mock files for testing
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   ├── index.css       # Global styles
│   ├── setupTests.ts   # Test setup configuration
│   └── vite-env.d.ts   # Vite environment types
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore file
├── index.html          # HTML entry point
├── jest.config.cjs     # Jest configuration
├── netlify.toml        # Netlify deployment configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node
└── vite.config.ts      # Vite configuration
```

## Features

- **Product Listing**: Display products in a grid or list view
- **Filtering and Sorting**: Filter products by category, price range, and other attributes
- **Search Functionality**: Search products by name or description
- **Product Details**: View detailed information about each product
- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Performance Optimization**: 
  - Virtualized lists for handling large datasets
  - Memoization to prevent unnecessary re-renders
- **Client-side Caching**: Store product data locally using Redux Persist
- **Accessibility**: WCAG 2.1 compliant components for inclusive user experience

## Deployment

This project is configured for deployment on [Netlify](https://www.netlify.com/). The `netlify.toml` file contains all the necessary configuration for deployment.

### Deployment Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Redirects**: All routes redirect to `index.html` to support client-side routing
- **Headers**: Includes security headers like Content-Security-Policy, X-Frame-Options, etc.
- **Asset Optimization**: CSS, JS, HTML, and images are optimized during build

### Deployment Steps

1. Connect your repository to Netlify
2. Configure the build settings (these are already set in `netlify.toml`)
3. Deploy the site

## Accessibility Compliance

This project is committed to maintaining WCAG 2.1 AA compliance to ensure an inclusive user experience for all users, including those with disabilities.

### Accessibility Features

- **Semantic HTML**: Using appropriate HTML elements for their intended purpose
- **Keyboard Navigation**: All interactive elements are accessible via keyboard
- **Screen Reader Support**: Proper ARIA attributes and semantic structure
- **Color Contrast**: Meeting WCAG 2.1 AA contrast requirements
- **Focus Management**: Visible focus indicators for keyboard users
- **Responsive Design**: Accessible on various devices and screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

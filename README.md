# Product Catalog Component

A comprehensive React component for rendering product catalog in an e-commerce application.

## Technologies Used

- **Programming Language**: TypeScript
- **Frontend Framework**: React.js (v18+)
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **Performance Optimization**: React.memo, Virtualization (react-window)
- **Testing Framework**: Jest, React Testing Library, Cypress
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store configuration
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── vite-env.d.ts   # Vite environment types
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore file
├── index.html          # HTML entry point
├── jest.config.cjs     # Jest configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Features

- Product listing with filtering and sorting
- Product details view
- Responsive design
- Performance optimized with virtualization
- Client-side caching with Redux Persist

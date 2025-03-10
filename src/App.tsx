import React from 'react';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Product Catalog Component</h1>
      </header>
      <main className="container mx-auto p-4">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;

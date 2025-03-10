import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Product Catalog Component</h1>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<div>Product Catalog will be displayed here</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import ProductsListing from "./Pages/ProductsListing";
import ProductPage from "./Pages/ProductPage";
import ManageProducts from "./Pages/ManageProducts";
import Suppliers from "./Pages/Suppliers";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsListing />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

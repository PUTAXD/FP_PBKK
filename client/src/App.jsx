import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import NavbarComponent from "./Pages/Components/NavbarComponent";
import Dashboard from "./Pages/Dashboard";
import ProductsListing from "./Pages/ProductsListing";
import ProductPage from "./Pages/ProductPage";
import ManageProducts from "./Pages/ManageProducts";
import Suppliers from "./Pages/Suppliers";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsListing />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/manage-products/add" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

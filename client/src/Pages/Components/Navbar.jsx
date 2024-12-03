import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active-nav-link" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active-nav-link" : "nav-link"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            isActive ? "nav-link active-nav-link" : "nav-link"
          }
        >
          Suppliers
        </NavLink>
      </nav>
    );
  }

  export default Navbar;
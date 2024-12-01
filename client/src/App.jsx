<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

>>>>>>> fa127a33ba6208a208eb4d50644bf73512e53fda
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
<<<<<<< HEAD
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((category) => (
            <li key={category.Id}>{category.Name}</li>
          ))}
        </ul>
      )}
=======
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Dashboard</Link>
      <Link to="/products" className="nav-link">Products</Link>
      <Link to="/suppliers" className="nav-link">Suppliers</Link>
    </nav>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="landing-image">
        <svg className="placeholder-image">
        </svg>
      </div>
      <div className="buttons wabutton">
        <a href="" rel="noopener noreferrer" className="button wabutton contact-us">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
        </svg> Contact us!
        </a>
        <Link to="/products" className="button check-products prbutton">
          Check our products!
        </Link>
      </div>
    </div>
  );
}

function Products() {
  const products = [
    { id: 1, name: 'Kue A', description: 'Delicious treat A', price: '$10', image: 'placeholder.jpg' },
    { id: 2, name: 'Kue B', description: 'Delicious treat B', price: '$15', image: 'placeholder.jpg' },
    { id: 3, name: 'Kue C', description: 'Delicious treat C', price: '$20', image: 'placeholder.jpg' },
  ];

  return (
    <div className="products">
      <h3 className="pageTitle">Our Products</h3>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} className="card-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
      </div>
>>>>>>> fa127a33ba6208a208eb4d50644bf73512e53fda
    </div>
  );
}

function Suppliers() {
  const suppliers = [
    { id: 1, name: 'Supplier A', description: 'Great supplier of ingredients.', address: '123 Street, City' },
    { id: 2, name: 'Supplier B', description: 'Trusted quality products.', address: '456 Avenue, City' },
  ];

  return (
    <div className="suppliers">
      <h1>Our Suppliers</h1>
      {suppliers.map((supplier) => (
        <div key={supplier.id} className="supplier">
          <h2>{supplier.name}</h2>
          <p>{supplier.description}</p>
          <p className="address">{supplier.address}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

function ProductsListing() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      // Fetch products
      fetch("http://localhost:8080/kue/all")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);
  
    // Function to filter products based on the search query
    const filteredProducts = products.filter((product) => {
      const queryWords = searchQuery.toLowerCase().split(/\s+/);
      return queryWords.every((word) =>
        product.nama.toLowerCase().includes(word)
      );
    });
  
    return (
      <div className="products">
        <h2 className="pageTitle">Our Products</h2>
        <div className="header-bar">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <a className="mng-product-href" href="/manage-products">
            <button className="mng-product-btn">Manage Products</button>
          </a>
        </div>
        <div className="grid">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="card-link"
            >
              <div className="card">
                <div className="card-content">
                  <div className="card-image">
                    <img src={product.img} alt={product.nama} />
                  </div>
                  <div className="card-details">
                    <h2>{product.nama}</h2>
                    <p>
                      {product.deskripsi.length > 60
                        ? product.deskripsi.slice(0, 60) + "..."
                        : product.deskripsi}
                    </p>
                    <p className="price">Rp {product.harga}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  export default ProductsListing;

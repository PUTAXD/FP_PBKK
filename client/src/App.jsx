import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useParams,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

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

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="landing-image">
        <svg className="placeholder-image"></svg>
      </div>
      <div className="buttons wabutton">
        <a
          href=""
          rel="noopener noreferrer"
          className="button wabutton contact-us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fff"
              d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
            ></path>
            <path
              fill="#fff"
              d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
            ></path>
            <path
              fill="#cfd8dc"
              d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
            ></path>
            <path
              fill="#40c351"
              d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
            ></path>
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
              clip-rule="evenodd"
            ></path>
          </svg>{" "}
          Contact us!
        </a>
        <NavLink to="/products" className="button check-products prbutton">
          Check our products!
        </NavLink>
      </div>
    </div>
  );
}

function Products() {
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

  // Group products by name and calculate price range
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const existing = acc.find((p) => p.nama === product.nama);
    if (existing) {
      existing.minPrice = Math.min(existing.minPrice, product.harga);
      existing.maxPrice = Math.max(existing.maxPrice, product.harga);
      existing.variantCount += 1;
    } else {
      acc.push({
        ...product,
        minPrice: product.harga,
        maxPrice: product.harga,
        variantCount: 1, // Keep track of how many variants exist
      });
    }
    return acc;
  }, []);

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
        {groupedProducts.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="card-link"
          >
            <div className="card">
              <div className="card-content">
                <div className="card-image">
                  <img src="/imgplaceholder.png" alt={product.nama} />
                </div>
                <div className="card-details">
                  <h2>{product.nama}</h2>
                  <p>
                    {product.deskripsi.length > 60
                      ? product.deskripsi.slice(0, 60) + "..."
                      : product.deskripsi}
                  </p>
                  <p className="price">
                    {product.variantCount > 1
                      ? `Rp ${product.minPrice} ~ Rp ${product.maxPrice}`
                      : `Rp ${product.minPrice}`}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLooading, setIsLoading] = useState(true);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    // Fetch the main product details by ID
    fetch(`http://localhost:8080/kue/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        console.log("Main product details:", data); // Log the main product details
        setProduct(data);
        setSelectedVariant(data.id); // Set the initial selected variant as the main product's ID

        // Fetch all variant details based on the main product's variants
        const variantIds = data.variant_ids || []; // Assuming `variant_ids` holds the IDs of related variants
        console.log("Variant IDs to fetch:", variantIds); // Log the IDs of the variants
        const variantRequests = variantIds.map((variantId) =>
          fetch(`http://localhost:8080/kue/${variantId}`).then((res) => {
            if (!res.ok)
              throw new Error(`Failed to fetch variant ${variantId}`);
            return res.json();
          })
        );

        Promise.all(variantRequests)
          .then((results) => {
            console.log("Fetched variant details:", results); // Log the fetched variant details
            setVariants(results);
          })
          .catch((error) => console.error("Error fetching variants:", error));
      })
      .catch((error) => console.error("Error fetching product details:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleVariantSelection = (variantId) => {
    setSelectedVariant(variantId);
  };

  if (isLooading) {
    return <p>Loading...</p>;
  }

  // Find the selected variant details from the fetched data
  const selectedProduct = variants.find(
    (variant) => variant.id === selectedVariant
  );

  return (
    <div className="product-page">
      <div className="product-content" style={{ display: "flex" }}>
        {/* Left side: Image */}
        <div style={{ width: "60%", padding: "20px" }}>
          <img
            src="/imgplaceholder.png"
            alt={product.nama}
            style={{ width: "100%" }}
          />
        </div>

        {/* Right side: Product details */}
        <div style={{ width: "40%", padding: "20px" }}>
          <h1>{product.nama}</h1>
          <p className="price" style={{ marginBottom: "20px" }}>
            Rp {selectedProduct ? selectedProduct.harga : product.harga}
          </p>

          {/* Variants grid */}
          <div
            className="variant-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => handleVariantSelection(variant.id)}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor:
                    variant.id === selectedVariant ? "#ddd" : "#fff",
                }}
              >
                {variant.harga}
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            style={{ borderBottom: "1px solid #ddd", paddingBottom: "20px" }}
          >
            <p>{product.deskripsi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [modifiedProducts, setModifiedProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    berat: "",
    supplier_id: "",
    varian_id: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // Fetch the main product details by ID
    fetch(`http://localhost:8080/kue/all`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        console.log("Main product data:", data); // Check the product data structure
        setProducts(data);
        // setSelectedVariant(data.id);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, []);

  const handleInputChange = (id, field, value) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id) {
          // Check if the value is different from the original product value
          if (product[field] !== value) {
            setModifiedProducts((prevModified) => ({
              ...prevModified,
              [id]: true, // Mark as modified
            }));
          }
          return { ...product, [field]: value };
        }
        return product;
      });
      return updatedProducts;
    });
    setIsModified(true);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleConfirmAdd = () => {
    fetch("http://localhost:8080/kue/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, data]);
        setNewProduct({
          nama: "",
          deskripsi: "",
          harga: "",
          berat: "",
          supplier_id: "",
          varian_id: "",
        });
        setIsAdding(false);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/kue/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
      })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleSave = (id) => {
    const productToSave = products.find((product) => product.id === id);

    fetch(`http://localhost:8080/kue/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToSave),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
      })
      .then(() => {
        // Mark as saved and remove the modification status
        setModifiedProducts((prevModified) => ({
          ...prevModified,
          [id]: false, // Reset the modified status for this product
        }));
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const filteredProducts = products.filter((product) => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/);
    return queryWords.every((word) =>
      product.nama.toLowerCase().includes(word)
    );
  });

  return (
    <div className="manage-products">
      <h2 className="pageTitle">Manage Products</h2>
      <div className="header-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button
          className="add-btn"
          onClick={handleAdd}
          style={{ backgroundColor: "#2196F3", cursor: "pointer" }}
        >
          Add
        </button>
      </div>

      {isAdding && (
        <div className="add-product-form">
          {/* Add product form as before */}
          <input
            type="text"
            placeholder="Nama"
            value={newProduct.nama}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, nama: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={newProduct.deskripsi}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, deskripsi: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Harga"
            value={newProduct.harga}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                harga: Number(e.target.value),
              }))
            }
          />
          <input
            type="number"
            placeholder="Berat"
            value={newProduct.berat}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                berat: Number(e.target.value),
              }))
            }
          />
          <select
            value={newProduct.supplier_id}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                supplier_id: Number(e.target.value),
              }))
            }
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.id}-{supplier.nama}
              </option>
            ))}
          </select>
          <select
            value={newProduct.varian_id}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                varian_id: Number(e.target.value),
              }))
            }
          >
            <option value="">Select Varian</option>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.id}-{variant.nama}
              </option>
            ))}
          </select>
          <button
            onClick={handleConfirmAdd}
            className="confirm-add-btn"
            style={{ marginTop: "10px" }}
          >
            Confirm Add
          </button>
        </div>
      )}
      <div className="products-table-div">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Berat</th>
              <th>Supplier ID</th>
              <th>Varian ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <input
                    type="text"
                    value={product.nama}
                    onChange={(e) =>
                      handleInputChange(product.id, "nama", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.deskripsi}
                    onChange={(e) =>
                      handleInputChange(product.id, "deskripsi", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.harga}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "harga",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={product.berat}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value >= 0.1 && value <= 1.0) {
                        handleInputChange(product.id, "berat", value);
                      }
                    }}
                  />
                </td>
                <td>
                  {product.supplier_id}-
                  {suppliers.find(
                    (supplier) => supplier.id === product.supplier_id
                  )?.nama || "Unknown Supplier"}
                </td>
                <td>
                  {product.varian_id}-
                  {variants.find((variant) => variant.id === product.varian_id)
                    ?.nama || "Unknown Variant"}
                </td>
                <td>
                  <button
                    onClick={() => handleSave(product.id)}
                    className={`save-btn ${
                      modifiedProducts[product.id] ? "modified" : ""
                    }`}
                    disabled={!modifiedProducts[product.id]} // Disable button if not modified
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/supplier/all")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="suppliers">
      <h2 className="pageTitle">Our Suppliers</h2>
      {suppliers.map((supplier) => (
        <div key={supplier.id} className="supplier">
          <p className="namaSupplier">{supplier.nama}</p>
          <p>{supplier.nomor_telfon}</p>
          <p className="address">{supplier.alamat}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

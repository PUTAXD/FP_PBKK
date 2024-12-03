import React, { useEffect, useState } from "react";
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
      fetch("http://localhost:8080/kue/all")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
  
      // Fetch suppliers and variants (example URLs)
      fetch("http://localhost:8080/supplier/all")
        .then((res) => res.json())
        .then((data) => setSuppliers(data))
        .catch((error) => console.error("Error fetching suppliers:", error));
  
      fetch("http://localhost:8080/varians/all")
        .then((res) => res.json())
        .then((data) => setVariants(data))
        .catch((error) => console.error("Error fetching variants:", error));
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
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
      return queryWords.every((word) => product.nama.toLowerCase().includes(word));
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
              onChange={(e) => setNewProduct((prev) => ({ ...prev, nama: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Deskripsi"
              value={newProduct.deskripsi}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, deskripsi: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Harga"
              value={newProduct.harga}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, harga: Number(e.target.value) }))}
            />
            <input
              type="number"
              placeholder="Berat"
              value={newProduct.berat}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, berat: Number(e.target.value) }))}
            />
            <select
              value={newProduct.supplier_id}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, supplier_id: Number(e.target.value) }))}
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
              onChange={(e) => setNewProduct((prev) => ({ ...prev, varian_id: Number(e.target.value) }))}
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
                      onChange={(e) => handleInputChange(product.id, "nama", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.deskripsi}
                      onChange={(e) => handleInputChange(product.id, "deskripsi", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.harga}
                      onChange={(e) => handleInputChange(product.id, "harga", parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.berat}
                      onChange={(e) => handleInputChange(product.id, "berat", parseFloat(e.target.value))}
                    />
                  </td>
                  <td>{product.supplier_id}</td>
                  <td>{product.varian_id}</td>
                  <td>
                    <button
                      onClick={() => handleSave(product.id)}
                      className={`save-btn ${modifiedProducts[product.id] ? "modified" : ""}`}
                      disabled={!modifiedProducts[product.id]} // Disable button if not modified
                    >
                      Save
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
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

  export default ManageProducts;

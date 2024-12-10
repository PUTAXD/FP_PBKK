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
    img: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [variants, setVariants] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
    }
  };

  const handleFileUpdate = (productId, e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file); // Update the file state

      // Mark the product as modified
      setModifiedProducts((prevModified) => ({
        ...prevModified,
        [productId]: true, // Set the modified status to true for the specific product
      }));
    }
  };

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

  const getSupplierName = (id) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.nama : "Unknown Supplier";
  };

  const getVariantName = (id) => {
    const variant = variants.find((variant) => variant.id === id);
    return variant ? variant.nama : "Unknown Variant";
  };
  const handleRefresh = () => {
    window.location.reload();
  };
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

  const handleConfirmAdd = async () => {
    let imagename = "";
    // Step 1: Upload the image and get the file path
    if (gambar) {
      const formData = new FormData();
      formData.append("gambar", gambar);

      try {
        const uploadResponse = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.filePath) {
          // Extract the filename from the filePath
          const filename = uploadData.filePath.split("/").pop();
          // Update the newProduct state with the new image path
          imagename = "/images/" + filename;
          setNewProduct((prev) => ({
            ...prev,
            img: imagename,
          }));
        } else {
          // Handle the case where filePath is not returned
          console.error("File path not returned from the server");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Step 2: Inject the img field manually into newProduct before sending
    const updatedProduct = {
      ...newProduct,
      img: imagename, // Set the img field with the uploaded image path
    };

    // Step 3: Add the product with the updated object
    try {
      const response = await fetch("http://localhost:8080/kue/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
      setNewProduct({
        nama: "",
        deskripsi: "",
        harga: "",
        berat: "",
        supplier_id: "",
        varian_id: "",
        img: "", // Reset img after product is added
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
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

  const handleSave = async (id) => {
    const productToSave = products.find((product) => product.id === id);

    // Step 1: Upload the image if a new image file was selected
    let imagename = productToSave.img; // Default to the existing image
    if (gambar) {
      // Assuming `gambar` contains the file selected for upload
      const formData = new FormData();
      formData.append("gambar", gambar);

      try {
        const uploadResponse = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.filePath) {
          const filename = uploadData.filePath.split("/").pop();
          imagename = "/images/" + filename; // Update the image path
        } else {
          console.error("File path not returned from the server");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Exit if image upload fails
      }
    }

    // Step 2: Inject the updated img path into the productToSave
    const updatedProduct = {
      ...productToSave,
      img: imagename,
    };

    // Step 3: Save the updated product data
    try {
      const response = await fetch(`http://localhost:8080/kue/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      await response.json();

      // Step 4: Mark the product as saved and reset modification status
      setModifiedProducts((prevModified) => ({
        ...prevModified,
        [id]: false, // Reset the modified status for this product
      }));

      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/);
    if (product.nama) {
      return queryWords.every((word) =>
        product.nama.toLowerCase().includes(word)
      );
    } else {
      handleRefresh();
    }
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
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
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
              <th>Image</th>
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
                <td
                  onClick={() =>
                    (window.location.href = `/products/${product.id}`)
                  }
                  onMouseEnter={(e) => (e.target.style.color = "blue")}
                  onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {product.id}
                </td>
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpdate(product.id, e)}
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
                    value={product.berat}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "berat",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  {product.supplier_id} - {getSupplierName(product.supplier_id)}
                </td>
                <td>
                  {product.varian_id} - {getVariantName(product.varian_id)}
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

export default ManageProducts;

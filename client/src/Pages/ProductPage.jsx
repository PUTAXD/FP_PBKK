import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        const variantIds = data.variant_ids || [];
        console.log("Variant IDs to fetch:", variantIds);
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
      <div className="product-content " style={{ display: "flex" }}>
        {/* Left side: Image */}
        <div style={{ width: "60%", padding: "20px" }}>
          <img src={product.img} alt={product.nama} style={{ width: "100%" }} />
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

export default ProductPage;

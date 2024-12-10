import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLooading, setIsLoading] = useState(true);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  function formatRupiah(amount) {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp${formattedAmount}`;
  }

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
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img src={product.img} alt={product.nama} />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.nama}
            </h1>
            <p className="mb-6 text-black text-sm dark:text-gray-400">
              Varian {product.varian_id}
            </p>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.deskripsi}
            </p>
            <p className="mt-6 text-black text-sm dark:text-gray-400">
              Supplier {product.supplier_id}
            </p>
            <div className=" sm:items-center sm:gap-4 sm:flex"></div>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8"></div>
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <div className="flex items-center justify-between">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {formatRupiah(product.harga)}
              </p>
              <button class="px-6 mt-2 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
                Add To Chart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <div className="product-page">
    //   <div className="product-content " style={{ display: "flex" }}>
    //     {/* Left side: Image */}
    //     <div style={{ width: "60%", padding: "20px" }}>
    //       <img src={product.img} alt={product.nama} style={{ width: "100%" }} />
    //     </div>

    //     {/* Right side: Product details */}
    //     <div style={{ width: "40%", padding: "20px" }}>
    //       <h1>{product.nama}</h1>
    //       <p className="price" style={{ marginBottom: "20px" }}>
    //         Rp {selectedProduct ? selectedProduct.harga : product.harga}
    //       </p>

    //       {/* Variants grid */}
    //       <div
    //         className="variant-grid"
    //         style={{
    //           display: "grid",
    //           gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    //           gap: "10px",
    //           marginBottom: "20px",
    //         }}
    //       >
    //         {variants.map((variant) => (
    //           <div
    //             key={variant.id}
    //             onClick={() => handleVariantSelection(variant.id)}
    //             style={{
    //               padding: "10px",
    //               border: "1px solid #ddd",
    //               borderRadius: "5px",
    //               cursor: "pointer",
    //               textAlign: "center",
    //               backgroundColor:
    //                 variant.id === selectedVariant ? "#ddd" : "#fff",
    //             }}
    //           >
    //             {variant.harga}
    //           </div>
    //         ))}
    //       </div>

    //       {/* Description */}
    //       <div
    //         style={{ borderBottom: "1px solid #ddd", paddingBottom: "20px" }}
    //       >
    //         <p>{product.deskripsi}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ProductPage;

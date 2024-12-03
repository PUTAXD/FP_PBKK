import React, { useState, useEffect } from "react";

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

  export default Suppliers;
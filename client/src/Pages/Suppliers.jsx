import React, { useState, useEffect, Fragment } from "react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/supplier/all")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Our Supplier
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Behind every perfect cake is a supplier who never compromises on
            quality.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <article
              key={supplier.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  {supplier.UpdatedAt}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {supplier.nama}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {supplier.alamat}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {supplier.nama}
                    </a>
                  </p>
                  <p className="text-gray-600">{supplier.nomor_telfon}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>

    // <div className="suppliers">
    //   <h2 className="pageTitle">Our Suppliers</h2>
    //   {suppliers.map((supplier) => (
    //     <div key={supplier.id} className="supplier">
    //       <p className="namaSupplier">{supplier.nama}</p>
    //       <p>{supplier.nomor_telfon}</p>
    //       <p className="address">{supplier.alamat}</p>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Suppliers;

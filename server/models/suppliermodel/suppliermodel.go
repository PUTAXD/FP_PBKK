package suppliermodel

import (
	"server/config"
	"server/entities"
)

func GetAll() []entities.Supplier {
	rows, err := config.DB.Query(`SELECT * FROM Supplier`)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var suppliers []entities.Supplier
	for rows.Next() {
		var supplier entities.Supplier
		if err := rows.Scan(&supplier.Id, &supplier.Nama, &supplier.NomorTelfon, &supplier.Alamat); err != nil {
			panic(err)
		}

		suppliers = append(suppliers, supplier)
	}

	return suppliers
}

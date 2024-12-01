package varianmodel

import (
	"server/config"
	"server/entities"
)

func GetAll() []entities.Varian {
	rows, err := config.DB.Query(`SELECT * FROM Varian`)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var varians []entities.Varian
	for rows.Next() {
		var varian entities.Varian
		if err := rows.Scan(&varian.Id, &varian.Nama); err != nil {
			panic(err)
		}

		varians = append(varians, varian)
	}

	return varians
}

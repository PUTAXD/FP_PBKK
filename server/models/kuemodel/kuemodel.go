package kuemodel

import (
	"server/config"
	"server/entities"
)

func GetAll() []entities.Kue {
	rows, err := config.DB.Query(`SELECT * FROM Kue`)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var Kues []entities.Kue
	for rows.Next() {
		var Kue entities.Kue
		// if err := rows.Scan(&Kue.Id, &Kue.Nama,&Kue.Img, &Kue.Deskripsi, &Kue.Harga, &Kue.Berat, &Kue.SupplierID, &Kue.VarianID, &Kue.CreatedAt, &Kue.UpdatedAt); err != nil {
		if err := rows.Scan(&Kue.Id, &Kue.Nama, &Kue.Deskripsi, &Kue.Harga, &Kue.Berat, &Kue.SupplierID, &Kue.VarianID, &Kue.CreatedAt, &Kue.UpdatedAt); err != nil {
			panic(err)
		}

		Kues = append(Kues, Kue)
	}

	return Kues
}

func Create(kue entities.Kue) bool {
	// Menyisipkan data ke dalam tabel Kue
	result, err := config.DB.Exec(`
		INSERT INTO Kue (nama, img, deskripsi, harga, berat, supplier_id, varian_id, createdAt, updatedAt)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		kue.Nama,
		kue.Img,
		kue.Deskripsi,
		kue.Harga,
		kue.Berat,
		kue.SupplierID,
		kue.VarianID,
		kue.CreatedAt,
		kue.UpdatedAt,
	)

	if err != nil {
		panic(err)
	}

	// Mengambil ID dari entri yang baru dimasukkan
	lastInsertId, err := result.LastInsertId()
	if err != nil {
		panic(err)
	}

	// Mengembalikan true jika ID yang dimasukkan lebih besar dari 0
	return lastInsertId > 0
}

func Detail(id int) entities.Kue {
	row := config.DB.QueryRow(`SELECT * FROM Kue WHERE id = ? `, id)

	var Kue entities.Kue

	if err := row.Scan(&Kue.Id, &Kue.Nama, &Kue.Img, &Kue.Deskripsi, &Kue.Harga, &Kue.Berat, &Kue.SupplierID, &Kue.VarianID, &Kue.CreatedAt, &Kue.UpdatedAt); err != nil {
		panic(err)
	}

	return Kue
}


func Update(id int, kue entities.Kue) bool {
	// Menyisipkan data ke dalam tabel Kue
	result, err := config.DB.Exec(`
		UPDATE Kue SET nama = ?, img = ?, deskripsi = ?, harga = ?, berat = ?, supplier_id = ?, varian_id = ?, updatedAt = ?
		WHERE id = ?`,
		kue.Nama,
		kue.Img,
		kue.Deskripsi,
		kue.Harga,
		kue.Berat,
		kue.SupplierID,
		kue.VarianID,
		kue.UpdatedAt,
		id,
	)

	if err != nil {
		panic(err)
	}

	// Mengambil ID dari entri yang baru dimasukkan
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		panic(err)
	}

	// Mengembalikan true jika ID yang dimasukkan lebih besar dari 0
	return rowsAffected > 0
}


func Delete(id int) error {
	_, err := config.DB.Exec("DELETE FROM Kue WHERE id = ?", id)
	return err
}
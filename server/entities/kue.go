package entities

import "time"

type Kue struct {
    Id			int     `json:"id"`
    Nama        string  `json:"nama"`
	Img       string  `json:"image"`
    Deskripsi   string  `json:"deskripsi"`
    Harga       int     `json:"harga"`
    Berat       float64 `json:"berat"`
    SupplierID  int     `json:"supplier_id"`
    VarianID    int     `json:"varian_id"`
	CreatedAt	time.Time
	UpdatedAt	time.Time
}
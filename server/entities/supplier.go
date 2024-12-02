package entities

import "time"

type Supplier struct {
    Id         int    `json:"id"`
    Nama      string `json:"nama"`
    NomorTelfon string `json:"nomor_telfon"`
    Alamat     string `json:"alamat"`
    CreatedAt  time.Time
    UpdatedAt  time.Time
}
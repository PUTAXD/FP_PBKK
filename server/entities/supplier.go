package entities

type Supplier struct {
    Id         int    `json:"id"`
    Nama      string `json:"nama"`
    NomorTelfon string `json:"nomor_telfon"`
    Alamat     string `json:"alamat"`
}
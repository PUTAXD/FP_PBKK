package entities

import "time"

type Varian struct {
    Id  int    `json:"id"`
    Nama string `json:"nama"`
    CreatedAt time.Time
    UpdatedAt time.Time
}
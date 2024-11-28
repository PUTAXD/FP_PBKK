package helper

import (
	"fmt"
	"strconv"
)

func StringToInt(id string) int{
	// Menggunakan strconv.Atoi untuk mencoba mengonversi string ke int
	num, err := strconv.Atoi(id)
	if err != nil {
		// Jika terjadi error (misalnya ada karakter non-numeric)
		fmt.Println("Error:", err)  
	} else {
		fmt.Println("Hasil konversi:", num)
	}
	return num
}
package apikue

import (
	"net/http"
	"server/entities"
	"server/helper"
	"server/models/kuemodel"
	"time"

	"github.com/gin-gonic/gin"
)

func GetKue(c *gin.Context) {
	// Ambil data kategori menggunakan fungsi GetAll dari model
	Kues := kuemodel.GetAll()

	// Kirimkan response JSON dengan status 200 OK
	c.JSON(http.StatusOK, Kues)
}

func AddKue(c *gin.Context) {
	var kue entities.Kue

    kue.CreatedAt = time.Now() // Untuk menyimpan waktu saat ini
	kue.UpdatedAt = time.Now()
	// Bind JSON body dari request ke struct Category
	if err := c.ShouldBindJSON(&kue); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

    if success := kuemodel.Create(kue); !success {
		// Jika gagal, kirimkan response gagal
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Category created successfully",
		"category": kue,
	})
}

func DetailKue(c *gin.Context) {
	idParam := c.Param("id") 
	

	id:= helper.StringToInt(idParam) 
	kue := kuemodel.Detail(id)

	// Mengembalikan data Kue dalam bentuk JSON
	c.JSON(http.StatusOK, kue)
}

func UpdateKue(c *gin.Context) {
	var kue entities.Kue

	// Ambil ID kategori dari URL parameter
	id := c.Param("id")

	if err := c.ShouldBindJSON(&kue); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set waktu 
	kue.UpdatedAt = time.Now()

    num := helper.StringToInt(id)
	// Memanggil fungsi untuk update kategori
	success := kuemodel.Update(num, kue)
	if !success {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update category"})
		return
	}

	// Kirimkan response berhasil
	c.JSON(http.StatusOK, gin.H{
		"message":  "Category updated successfully",
		"Kue": kue,
	})
}

func DeleteKue(c *gin.Context) {
	
	// Ambil ID dari URL parameter
	id := c.Param("id")

	num := helper.StringToInt(id)
	err := kuemodel.Delete(num)
	
	if err != nil {
		// Jika ada error (misalnya kategori tidak ditemukan)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Mengirimkan response sukses jika kategori berhasil dihapus
	c.JSON(http.StatusOK, gin.H{
		"message": "Category deleted successfully",
	})
}


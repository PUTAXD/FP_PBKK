package apicategories

import (
	"net/http"
	"server/entities"
	"server/helper"
	"server/models/categorymodel"
	"time"

	"github.com/gin-gonic/gin"
)
func GetCategories(c *gin.Context) {
	// Ambil data kategori menggunakan fungsi GetAll dari model
	categories := categorymodel.GetAll()

	// Kirimkan response JSON dengan status 200 OK
	c.JSON(http.StatusOK, categories)
}

func AddCategory(c *gin.Context) {
	var category entities.Category
    // Baca seluruh body request menjadi byte
	// body, err := c.GetRawData()
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
	// 	return
	// }
    
    // // Print JSON sebelum binding ke struct (untuk debugging)
	// fmt.Println("Received JSON: ", string(body))

    category.CreatedAt = time.Now() // Untuk menyimpan waktu saat ini
	category.UpdatedAt = time.Now()
	// Bind JSON body dari request ke struct Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

    if success := categorymodel.Create(category); !success {
		// Jika gagal, kirimkan response gagal
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Category created successfully",
		"category": category,
	})
}

func UpdateCategory(c *gin.Context) {
	var category entities.Category

	// Ambil ID kategori dari URL parameter
	id := c.Param("id")

	// Bind JSON yang diterima ke dalam struct Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set waktu 
	category.UpdatedAt = time.Now()

    num := helper.StringToInt(id)
	// Memanggil fungsi untuk update kategori
	success := categorymodel.Update(num, category)
	if !success {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update category"})
		return
	}

	// Kirimkan response berhasil
	c.JSON(http.StatusOK, gin.H{
		"message":  "Category updated successfully",
		"category": category,
	})
}

func DeleteCategory(c *gin.Context) {
	
	// Ambil ID dari URL parameter
	id := c.Param("id")

	num := helper.StringToInt(id)
	err := categorymodel.Delete(num)
	
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
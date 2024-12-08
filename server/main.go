package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"server/api/apikue"
	"server/api/apisupplier"
	"server/api/apivariant"
	"server/config"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Membuka akses untuk semua origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	}))

	//varian
	r.GET("/varians/all", apivariant.GetVarian)

	//supplier
	r.GET("/supplier/all", apisupplier.GetSupplier)

	//kue
	r.GET("/kue/all", apikue.GetKue)
	r.GET("/kue/:id", apikue.DetailKue)
	r.POST("/kue/add", apikue.AddKue)
	r.PUT("/kue/update/:id", apikue.UpdateKue)
	r.DELETE("/kue/delete/:id", apikue.DeleteKue)

	r.POST("/upload", func(c *gin.Context) {
		// Mendapatkan file dari form-data dengan key 'gambar'
		file, err := c.FormFile("gambar")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Gagal mendapatkan file"})
			return
		}

		// Membuat folder public/images jika belum ada
		err = os.MkdirAll("../client/public/images", os.ModePerm)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat folder"})
			return
		}

		// Menentukan path untuk menyimpan file
		filePath := filepath.Join("../client/public/images", file.Filename)

		// Menyimpan file ke server
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan file"})
			return
		}

		// Mengirimkan response dengan path gambar yang sudah di-upload
		c.JSON(http.StatusOK, gin.H{
			"message":  "File berhasil di-upload",
			"filePath": fmt.Sprintf("/images/%s", file.Filename), // Path gambar yang dapat diakses di frontend
		})
	})

	// Menyajikan file statis dari public folder (termasuk images)
	r.Static("/images", "../client/public/images")

	// Menjalankan server
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}

	

}
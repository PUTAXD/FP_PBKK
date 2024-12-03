package main

import (
	"log"
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

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}

}

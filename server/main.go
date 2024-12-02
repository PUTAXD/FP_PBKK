package main

import (
	"log"
	"server/api/apikue"
	"server/api/apisupplier"
	"server/api/apivariant"
	"server/config"

  "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


  func main() {
      config.ConnectDB()
      

      r := gin.Default()

      // Configure CORS
      r.Use(cors.Default())

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
package main

import (
	"log"
	"server/api/apicategories"
	"server/api/apikue"
	"server/api/apisupplier"
	"server/api/apivariant"
	"server/config"

	"github.com/gin-gonic/gin"
)


func main() {
    config.ConnectDB()
    

    r := gin.Default()
    
    r.GET("/categories", apicategories.GetCategories)
    r.POST("/categories/add", apicategories.AddCategory)
    r.PUT("/categories/update/:id", apicategories.UpdateCategory) 
    r.DELETE("/categories/delete/:id", apicategories.DeleteCategory)

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


    // //1.HomePage
    // http.HandleFunc("/", homecontroller.Welcome)

    // //2. Categories
    // http.HandleFunc("/categories", categorycontroller.Index)
	// http.HandleFunc("/categories/add", categorycontroller.Add)
	// http.HandleFunc("/categories/edit", categorycontroller.Edit)
	// http.HandleFunc("/categories/delete", categorycontroller.Delete)

    // log.Println("Server running on port: 7676")
    // http.ListenAndServe(":7676",nil)
}
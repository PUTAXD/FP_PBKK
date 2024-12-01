package apivariant

import (
	"net/http"
	"server/models/varianmodel"

	"github.com/gin-gonic/gin"
)

func GetVarian(c *gin.Context) {
	// Ambil data kategori menggunakan fungsi GetAll dari model
	varians := varianmodel.GetAll()

	// Kirimkan response JSON dengan status 200 OK
	c.JSON(http.StatusOK, varians)
}
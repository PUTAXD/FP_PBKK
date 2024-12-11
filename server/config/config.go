package config

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {
	// db, err := sql.Open("mysql", "admin:root@/db_kue?parseTime=True")
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3310)/db_kue?parseTime=True")
	if err != nil {
		panic(err)
	}

	// Check if the database is reachable
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	DB = db

	log.Println("Database connected")
}

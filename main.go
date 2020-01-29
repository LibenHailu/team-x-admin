package main

import (
	"database/sql"
	"fmt"
	"github.com/LibenHailu/admin_admin/admin_crud/repository"
	"github.com/LibenHailu/admin_admin/admin_crud/service"
	"github.com/LibenHailu/admin_admin/delivery/http/handler"
	_ "github.com/go-sql-driver/mysql"
	"html/template"
	"net/http"
)

func main()  {
	db, err := sql.Open("mysql", "root:admin123@tcp(localhost:3306)/fjobsdb?parseTime=true")
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	defer db.Close()
	if err := db.Ping(); err != nil {
		panic(err)
	}
	var tmpl = template.Must(template.ParseGlob("../../ui/template/*"))

	adminRepo := repository.NewMysqlAdminRepository(db)
	adminServ := service.NewAdminService(adminRepo)

	adminHandler := handler.NewAdminHandler(tmpl, adminServ)

	//mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("../../ui/assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	http.HandleFunc("/signup",adminHandler.SignUp)
	http.HandleFunc("/login", adminHandler.LogIn)
	http.HandleFunc("/", adminHandler.Index)
	http.HandleFunc("/update", adminHandler.Update)
	http.HandleFunc("/delete", adminHandler.Delete)
	http.HandleFunc("/removeuser", adminHandler.RemoveUser)
	http.HandleFunc("/removeproject", adminHandler.RemoveProject)
	http.HandleFunc("/allusers", adminHandler.AllUsers)
	http.HandleFunc("/allprojects", adminHandler.AllProjects)
	http.ListenAndServe(":8080", nil)
}

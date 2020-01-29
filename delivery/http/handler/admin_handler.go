package handler

import (
	"github.com/LibenHailu/admin_admin/admin_crud"
	"github.com/LibenHailu/admin_admin/admin_crud/service"
	"github.com/LibenHailu/admin_admin/entity"
	"html/template"
	"net/http"
)
// AdminHandler handles admin handler requests
type AdminHandler struct {
	tmpl        *template.Template
	adminSrv 	admin_crud.AdminService
}
// NewAdminHandler initializes and returns new AdminHandler
func NewAdminHandler(t *template.Template, as *service.AdminService) *AdminHandler {
	return &AdminHandler{tmpl: t, adminSrv: as}
}
//SignUp handles signup requests
func (ah *AdminHandler) SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		admin := entity.Admin{}
		admin.Firstname = r.FormValue("fname")
		admin.Lastname = r.FormValue("lname")

		admin.Phonenumber = r.FormValue("phone")
		admin.Email = r.FormValue("email")
		admin.Password = r.FormValue("pass")
		_,err := ah.adminSrv.StoreAdmin(&admin)
		if err != nil {
			//fmt.Println(err)
			//panic(err)
			ah.tmpl.ExecuteTemplate(w, "register.layout", nil)
		}
		http.Redirect(w, r, "/", http.StatusSeeOther)
	} else {
		ah.tmpl.ExecuteTemplate(w, "register.layout", nil)
	}
}
//Login handles login requests
func (ah *AdminHandler) LogIn(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		email := r.FormValue("email")
		password := r.FormValue("pass")
		_,err := ah.adminSrv.Admin(email,password)
		if err != nil {
			//fmt.Println(err)
			//panic(err)
			ah.tmpl.ExecuteTemplate(w, "login.layout", nil)
		}
		http.Redirect(w, r, "/", http.StatusSeeOther)
	} else {
		ah.tmpl.ExecuteTemplate(w, "login.layout", nil)
	}
}
func (ah *AdminHandler) Index(w http.ResponseWriter, r *http.Request) {
	ah.tmpl.ExecuteTemplate(w, "index.layout", nil)
}

//SignUp handles signup requests
func (ah *AdminHandler) Update(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		admin := entity.Admin{}
		admin.AID = r.FormValue("aid")
		admin.Firstname = r.FormValue("fname")
		admin.Lastname = r.FormValue("lname")

		admin.Phonenumber = r.FormValue("phone")
		admin.Email = r.FormValue("email")
		admin.Password = r.FormValue("pass")
		_,err := ah.adminSrv.UpdateAdmin(&admin)
		if err != nil {
			//fmt.Println(err)
			//panic(err)
			ah.tmpl.ExecuteTemplate(w, "update.layout", nil)
		}
		http.Redirect(w, r, "/", http.StatusSeeOther)
	} else {
		ah.tmpl.ExecuteTemplate(w, "update.layout", nil)
	}
}

//Delete handles delete requests
func (ah *AdminHandler) Delete(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		aid := r.FormValue("aid")
		_,err := ah.adminSrv.DeleteAdmin(aid)
		if err != nil {
			ah.tmpl.ExecuteTemplate(w, "login.layout", nil)
		}
		http.Redirect(w, r, "/signup", http.StatusSeeOther)
	} else {
		ah.tmpl.ExecuteTemplate(w, "delete.layout", nil)
	}
}
//RemoveUser handles /removeuser requests
func (ah *AdminHandler)RemoveUser(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {


	} else {
		ah.tmpl.ExecuteTemplate(w, "remove_user.layout", nil)
	}
}
//RemoveProject handles /removeproject requests
func (ah *AdminHandler)RemoveProject(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {


	} else {
		ah.tmpl.ExecuteTemplate(w, "remove_project.layout", nil)
	}
}
//AllUsers handles /allusers requests
func (ah *AdminHandler)AllUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {


	} else {
		ah.tmpl.ExecuteTemplate(w, "all_users.layout", nil)
	}
}

//AllProjects handles /allprojects requests
func (ah *AdminHandler)AllProjects(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {


	} else {
		ah.tmpl.ExecuteTemplate(w, "all_projects.layout", nil)
	}
}


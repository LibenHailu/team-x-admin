package admin_crud

import "github.com/LibenHailu/admin_admin/entity"
//AdminService contains databse operation methods
type AdminRepository interface{
	Admin(email,password string) (*entity.Admin, []error)
	UpdateAdmin(user *entity.Admin) (*entity.Admin, []error)
	DeleteAdmin(id string) (*entity.Admin, []error)
	StoreAdmin(admin *entity.Admin) (*entity.Admin, []error)
}
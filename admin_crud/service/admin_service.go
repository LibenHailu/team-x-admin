package service

import (
	"github.com/LibenHailu/admin_admin/admin_crud"
	"github.com/LibenHailu/admin_admin/admin_crud/repository"
	"github.com/LibenHailu/admin_admin/entity"
)

//AdminService struct implements AdminRepository interface
type AdminService struct {
	adminRepo admin_crud.AdminRepository
}
//NewAdminService creates a new object of AdminService
func NewAdminService(adminRepo *repository.MysqlAdminRepository) *AdminService {
	return &AdminService{adminRepo: adminRepo}
}
//StoreAdmin stores admin on the database
func (as *AdminService) StoreAdmin(admin *entity.Admin) (*entity.Admin,[]error) {

	_,err := as.adminRepo.StoreAdmin(admin)

	if len(err) > 0{
		return nil,err
	}
	return admin,nil
}
//StoreAdmin stores admin on the database
func (as *AdminService) Admin(email,password string) (*entity.Admin,[]error) {

	admin,err := as.adminRepo.Admin(email,password)

	if len(err) > 0{
		return nil,err
	}
	return admin,nil
}

//UpdateAdmin updates
func (as *AdminService)UpdateAdmin(admin *entity.Admin) (*entity.Admin,[]error) {

	admin,err := as.adminRepo.UpdateAdmin(admin)

	if len(err) > 0{
		return nil,err
	}
	return admin,nil
}

//DeleteAdmin deletes admin
func (as *AdminService)DeleteAdmin(id string) (*entity.Admin,[]error) {

	admin,err := as.adminRepo.DeleteAdmin(id)

	if len(err) > 0{
		return nil,err
	}
	return admin,nil
}

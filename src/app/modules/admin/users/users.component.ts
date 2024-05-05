import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/shared/services/user-list.service';
import { UserUpdateService } from 'src/app/shared/services/user-update.service';
import { HttpResponseService } from 'src/app/_services/http-response.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit {

  users: any = [];
  
  constructor(
    public datePipe: DatePipe,
    private _userListService: UserListService,
    private _userService: UserService,
    private _updateUserService: UserUpdateService,
    private toastr: ToastrService,
    public _httpResponseService: HttpResponseService
  ) { }
  
  ngOnInit() {
    this._userListService.users$.subscribe((users: any) => {
      this.users = users;
    });
    
    this._userListService.getUsers();
  }
  
  editUser(user: any) {
    this._updateUserService.setData(user);
  }
  
  deleteUser(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-secondary)',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.delete(id).then((response) => {
          this._userListService.getUsers();
          this.toastr.success(response.message, 'Ok !');
        }).catch((err: any) => {
          console.log(err);
          this.toastr.error(err.error.message, 'Erreur !');
        })
      }
      
    })
  }
  
  changeStatus(e: any, id: any) {
    let val = e.target.checked;
    this._userService.status({ active: val }, id).then((response) => {
      this._userListService.getUsers();
      this.toastr.success(response.message, 'Ok !');
    }).catch((err: any) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Erreur !');
    }) 
  
  }
}

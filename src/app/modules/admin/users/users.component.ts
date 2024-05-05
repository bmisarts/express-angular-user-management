import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserListService } from 'src/app/shared/services/user-list.service';
import { UserUpdateService } from 'src/app/shared/services/user-update.service';
import { HttpResponseService } from 'src/app/_services/http-response.service';
import { UserService } from 'src/app/_services/user.service';

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
    this._userService.delete(id).then((response) => {
      this._userListService.getUsers();
      this._httpResponseService.response = {status: true, message: response.message};
    }).catch((err: any) => {
      console.log(err);
      this._httpResponseService.response = {status: false, message: err.error.message};
    }) 
  }
  
  changeStatus(e: any, id: any) {
    let val = e.target.checked;
    this._userService.status({ active: val }, id).then((response) => {
      this._userListService.getUsers();
      this._httpResponseService.response = {status: true, message: response.message};
    }).catch((err: any) => {
      console.log(err);
      this._httpResponseService.response = {status: false, message: err.error.message};
    }) 
  
  }
}

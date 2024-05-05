import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private _userService: UserService,
    public datePipe: DatePipe,
  ){ }
  
  ngOnInit() {
    this._userService.list().subscribe((response: any) => {
      this.users = response.data;
    })
  }
}

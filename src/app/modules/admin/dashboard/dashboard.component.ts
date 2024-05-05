import { Component } from '@angular/core';
import { UserListService } from 'src/app/shared/services/user-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userLength: number = 0;
  
  constructor(private _userListService: UserListService) {
  
  }
  
  ngOnInit() {
    this._userListService.users$.subscribe((users: any) => {
      this.userLength = users.length;
    });
    
    this._userListService.getUsers();
  }
  
}

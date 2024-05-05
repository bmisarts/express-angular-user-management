import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private userListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  users$: Observable<any[]> = this.userListSubject.asObservable();
  
  constructor(private userService: UserService) { }
  
  updateUserList(users: any[]): void {
    this.userListSubject.next(users);
  }
  
  getUsers(): void {
    this.userService.list().subscribe(response => {
      this.updateUserList(response.data);
    });
  }
}

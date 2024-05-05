import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();
  
  constructor() { }
  
  setData(user: any) {
    this.selectedUserSubject.next(user);
  }
}

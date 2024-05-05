import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from 'src/app/shared/services/user-list.service';
import { UserUpdateService } from 'src/app/shared/services/user-update.service';
import { HttpResponseService } from 'src/app/_services/http-response.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  
  updateForm!: FormGroup;
  submitted = false;
  
  user: any;
  
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _userListService: UserListService,
    private _updateUersErvice: UserUpdateService,
    public _httpResponseService: HttpResponseService,
  ) {}
  
  ngOnInit(): void {
    this._updateUersErvice.selectedUser$.subscribe(user => {
      this._httpResponseService.response.message = '';
      this.user = user;
      this.updateForm = this.fb.group({
        name: [this.user?.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        email: [this.user?.email, [Validators.required, Validators.email]],
        active: [this.user?.active]
      });
    });
    
    // Reinitialiser l'alert de reponse http
    this.updateForm.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }  
  
  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return;
    }
    this._userService.update(this.updateForm.value, this.user.id).then((response) => {
      this.submitted = false;
      this.updateForm.reset();
      this._userListService.getUsers();
      this._httpResponseService.response = {status: true, message: response.message};
    }).catch((err: any) => {
      console.log(err);
      this._httpResponseService.response = {status: false, message: err.error.message};
    }) 
  }

}

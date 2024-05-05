import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from 'src/app/shared/services/user-list.service';
import { HttpResponseService } from 'src/app/_services/http-response.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  
  createForm!: FormGroup;
  submitted = false;
  message = '';
  
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _userListService: UserListService,
    public _httpResponseService: HttpResponseService,
  ) {}
  
  ngOnInit(): void {
    this._httpResponseService.response.message = '';
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      active: [true]
    });
    
    // Reinitialiser l'alert de reponse http
    this.createForm.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }  
  
  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return;
    }
    this._userService.store(this.createForm.value).then((response) => {
      this.submitted = false;
      this.createForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        active: [true]
      });
      this._userListService.getUsers();
      this._httpResponseService.response = {status: true, message: response.message};
    }).catch((err: any) => {
      console.log(err);
      this._httpResponseService.response = {status: false, message: err.error.message};
    }) 
  }

}

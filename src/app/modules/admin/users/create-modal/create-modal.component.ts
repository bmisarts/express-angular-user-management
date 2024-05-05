import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  
  createForm!: FormGroup;
  submited = false;
  
  constructor(
    private fb: FormBuilder,
  ) {}
  
  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['']
    });
    
    console.log(this.createForm);
  }  
  
  onSubmit() {
    this.submited = true;
    
    console.log(this.createForm.value);
    
    if(this.createForm.invalid) {
    
      return;
    }
    // this._userService.
  }

}

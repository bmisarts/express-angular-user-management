import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateModalComponent } from './users/create-modal/create-modal.component';
import { UpdateModalComponent } from './users/update-modal/update-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    IndexComponent,
    CreateModalComponent,
    UpdateModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

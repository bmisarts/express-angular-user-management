import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { HttpResponseStatusComponent } from './services/http-response-status/http-response-status.component';
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    BackToTopComponent,
    FooterComponent,
    LoaderComponent,
    HttpResponseStatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    BackToTopComponent,
    FooterComponent,
    LoaderComponent,
    HttpResponseStatusComponent
  ]
})
export class SharedModule { }

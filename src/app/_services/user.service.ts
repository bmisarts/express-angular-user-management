import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  options: any;
  
  constructor(
    private http: HttpClient,
  ) {
		this.options = {
		  headers: new HttpHeaders({
  			Accept: 'application/json',
  			'Content-Type': 'application/json',
		  })
		}; 
  }
  list(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/user`, this.options);
  }
  get(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/user/${id}`, this.options);
  }
  store(data: any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/user`, data, this.options).toPromise();
  }
  update(data: any, id: any): Promise<any> {
    return this.http.put<any>(`${environment.apiUrl}/user/${id}`, data, this.options).toPromise();
  }
  status(data: any, id: any): Promise<any> {
    return this.http.put<any>(`${environment.apiUrl}/user/change-status/${id}`, data, this.options).toPromise();
  }
  delete(id: any): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/user/${id}`, this.options).toPromise();
  }
}

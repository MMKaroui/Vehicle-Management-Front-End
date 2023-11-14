import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import {  Observable} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import{User} from '../model/user';

import { FormGroup, ReactiveFormsModule, Validators,FormControl,FormGroupName, FormBuilder  } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/users';
  private baseUrl1 = '/api/authenticate';
  islogin = false;
  Adminastreur = false;
  ChefDuParc = false;
  ResReaparation = false;
  choixmenu : string = 'A';
  listData : User[];
  tokenStr = localStorage.getItem('token');
  public dataForm: FormGroup;
  constructor(private http: HttpClient) { }
  
  login( login, password) {
     return this.http.post(`${this.baseUrl1}`,{login, password});
   }  

getData(id: number): Observable<object>{
  return this.http.get(`${this.baseUrl}/${id}` );
}
createData(info: object): Observable<object>{
  return this.http.post(`${this.baseUrl}`, info);
}
updatedata(id : number, value: any): Observable<object>{
  return this.http.put(`${this.baseUrl}/${id}`, value );
} 
deleteData(id: number): Observable<any>{
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text'  }  );

}
getAll(): Observable<any> {
  return this.http.get(`${this.baseUrl}` );
}
}

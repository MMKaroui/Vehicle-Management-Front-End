import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import {  Observable} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import{Role} from '../model/role';

import { FormGroup, ReactiveFormsModule, Validators,FormControl,FormGroupName, FormBuilder  } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = '/api/roles';
  choixmenu : string = 'A';
  listData : Role[];
 
  tokenStr = localStorage.getItem('token');
  public dataForm: FormGroup;
constructor(private http: HttpClient){}

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

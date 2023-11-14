import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import {  Observable} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import{Facture} from '../model/facture';
import { FormGroup, ReactiveFormsModule, Validators,FormControl,FormGroupName, FormBuilder  } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  
  private baseUrl = '/api/factures';
  private baseUrl1 = '/api/factures/coutvehicule';
  private baseUrl2 = '/api/factures/cout';
  private baseUrl3 = '/api/factures/coutEn';
  private baseUrl4 = '/api/factures/coutMe';
  private baseUrl5 = '/api/factures/coutEl';
  private baseUrl6 = '/api/factures/coutTo';
  private baseUrl7 = '/api/factures/coutRepF';
  private baseUrl8 = '/api/factures/coutRepS';
  choixmenu : string = 'A';
  listData : Facture[];
 
  tokenStr = localStorage.getItem('token');
  public dataForm: FormGroup;

  constructor(private http: HttpClient) { }
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
  getCoutTotals(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/${id}`);
  }
  getCoutTotalsVehicule(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }
  getCoutTotalEn(): Observable<any> {
    return this.http.get(`${this.baseUrl3}`);
  }
  getCoutTotalMe(): Observable<any> {
    return this.http.get(`${this.baseUrl4}`);
  }
  getCoutTotalEl(): Observable<any> {
    return this.http.get(`${this.baseUrl5}`);
  }
  getCoutTotalTo(): Observable<any> {
    return this.http.get(`${this.baseUrl6}`);
  }
  getCoutTotalFonction(): Observable<any> {
    return this.http.get(`${this.baseUrl7}`);
  }
  getCoutTotalService(): Observable<any> {
    return this.http.get(`${this.baseUrl8}`);
  }
  
  }
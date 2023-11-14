import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Marque} from '../../model/marque';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddmarqueComponent } from '../addmarque/addmarque.component';


import { MatIconModule } from '@angular/material/icon';
import { MarqueService } from '../../service/marque.service';

@Component({
  selector: 'app-listmarque',
  templateUrl: './listmarque.component.html',
  styleUrls: ['./listmarque.component.scss']
})
export class ListmarqueComponent implements OnInit {

  
  Marque : Marque;
  listData : Observable<Marque[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : MarqueService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddmarqueComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addmarque()
    {
      this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddmarqueComponent, dialogConfig);
  }
  getData(){
    this.listData = this.crudApi.getAll();
  }
  removeData(id:number){
    if(window.confirm('vous êtes sur vous voulez supprimer  ?')){
      this.crudApi.deleteData(id)
      .subscribe(
        data =>{
          console.log(data);
          this.toastr.warning('Marque bien supprimer');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : Marque){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddmarqueComponent, dialogConfig);
           
            
          }
          
  
      
  }
  
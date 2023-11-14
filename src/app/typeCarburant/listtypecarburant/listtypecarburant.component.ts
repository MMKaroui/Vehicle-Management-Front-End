import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddtypecarburantComponent } from '../addtypecarburant/addtypecarburant.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { TypeCarburant } from '../../model/type-carburant';
import { TypeCarburantService } from '../../service/type-carburant.service';

@Component({
  selector: 'app-listtypecarburant',
  templateUrl: './listtypecarburant.component.html',
  styleUrls: ['./listtypecarburant.component.scss']
})
export class ListtypecarburantComponent implements OnInit {

 
  TypeCarburant : TypeCarburant;
  listData : Observable<TypeCarburant[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : TypeCarburantService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddtypecarburantComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addtypecarburant()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddtypecarburantComponent, dialogConfig);
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
          this.toastr.warning('Type bien supprimer');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : TypeCarburant){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddtypecarburantComponent, dialogConfig);
           
            
          }
          
  
      
  }
  


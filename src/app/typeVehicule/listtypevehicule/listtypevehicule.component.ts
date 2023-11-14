import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddtypevehiculeComponent } from '../addtypevehicule/addtypevehicule.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { TypeVehicule } from '../../model/typeVehicule';
import { TypeVehiculeService } from '../../service/type-vehicule.service';

@Component({
  selector: 'app-listtypevehicule',
  templateUrl: './listtypevehicule.component.html',
  styleUrls: ['./listtypevehicule.component.scss']
})
export class ListtypevehiculeComponent implements OnInit {

  TypeVehicule : TypeVehicule;
  listData : Observable<TypeVehicule[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : TypeVehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddtypevehiculeComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addtypevehicule()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddtypevehiculeComponent, dialogConfig);
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
          selectData(item : TypeVehicule){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddtypevehiculeComponent, dialogConfig);
           
            
          }
          
  
      
  }
  

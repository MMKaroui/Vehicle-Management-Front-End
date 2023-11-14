import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddtypereparationComponent } from '../addtypereparation/addtypereparation.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { TypeCarburant } from '../../model/type-carburant';
import { TypeReparationService } from '../../service/type-reparation.service';
import { TypeReparation } from 'src/app/model/type-reparation';

@Component({
  selector: 'app-listtypereparation',
  templateUrl: './listtypereparation.component.html',
  styleUrls: ['./listtypereparation.component.scss']
})
export class ListtypereparationComponent implements OnInit {

  
 
  TypeReparation : TypeReparation;
  listData : Observable<TypeReparation[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : TypeReparationService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddtypereparationComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addtypereparation()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddtypereparationComponent, dialogConfig);
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
          this.toastr.warning('Type  réparation bien supprimé');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : TypeReparation){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddtypereparationComponent, dialogConfig);
           
            
          }
          
  
      
  }
  


import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddatelierComponent } from '../addatelier/addatelier.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { Atelier } from '../../model/atelier';
import { AtelierService } from '../../service/atelier.service';

@Component({
  selector: 'app-listatelier',
  templateUrl: './listatelier.component.html',
  styleUrls: ['./listatelier.component.scss']
})
export class ListatelierComponent implements OnInit {

 
  Atelier : Atelier;
  listData : Observable<Atelier[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : AtelierService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddatelierComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addatelier()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddatelierComponent, dialogConfig);
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
          this.toastr.warning('Atelier bien supprimé');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : Atelier){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddatelierComponent, dialogConfig);
           
            
          }
          
  
      
  }
  


import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Vehicule} from '../../model/vehicule';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddvehiculeComponent } from '../addvehicule/addvehicule.component';


import { MatIconModule } from '@angular/material/icon';
import { VehiculeService } from '../../service/vehicule.service';

@Component({
  selector: 'app-listvehicule',
  templateUrl: './listvehicule.component.html',
  styleUrls: ['./listvehicule.component.scss']
})
export class ListvehiculeComponent implements OnInit {

  
  Vehicule : Vehicule;
  listData : Observable<Vehicule[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddvehiculeComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addvehicule()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    this.matDialog.open(AddvehiculeComponent, dialogConfig);
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
          this.toastr.warning('Véhicule bien supprimé');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : Vehicule){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddvehiculeComponent, dialogConfig);
           
            
          }
          
  
      
  }
  
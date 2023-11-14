import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddfabricantComponent } from '../addfabricant/addfabricant.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { Fabricant } from '../../model/fabricant';
import { FabricantService } from '../../service/fabricant.service';


@Component({
  selector: 'app-listfabricant',
  templateUrl: './listfabricant.component.html',
  styleUrls: ['./listfabricant.component.scss']
})
export class ListfabricantComponent implements OnInit {

  Fabricant : Fabricant;
  listData : Observable<Fabricant[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : FabricantService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddfabricantComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addfabricant()
  {  this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddfabricantComponent, dialogConfig);
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
          this.toastr.warning('Fabricant bien supprimer');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : Fabricant){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddfabricantComponent, dialogConfig);
           
            
          }
          
  
      
  }
  

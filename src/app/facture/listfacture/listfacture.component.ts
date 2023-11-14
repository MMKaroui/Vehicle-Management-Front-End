import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Facture} from '../../model/facture';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddfactureComponent } from '../addfacture/addfacture.component';


import { MatIconModule } from '@angular/material/icon';
import { FactureService } from '../../service/facture.service';

@Component({
  selector: 'app-listfacture',
  templateUrl: './listfacture.component.html',
  styleUrls: ['./listfacture.component.scss']
})
export class ListfactureComponent implements OnInit {

  
  Facture : Facture;
  listData : Observable<Facture[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : FactureService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AddfactureComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  addfacture()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    
    this.matDialog.open(AddfactureComponent, dialogConfig);
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
          this.toastr.warning('Facture  supprimée');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : Facture){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "50%";
           this.matDialog.open(AddfactureComponent, dialogConfig);
           
            
          }
          
  
      
  }
  

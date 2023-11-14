import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { User} from '../../model/user';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  
  User : User;
  listData : Observable<User[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : UserService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
     public dialogRef:MatDialogRef<AdduserComponent>, ){}
  ngOnInit(){
    this.getData();
  }
  
  adduser()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    this.matDialog.open(AdduserComponent, dialogConfig);
  }
  ngOnChanges(){
    this.getData();
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
          this.toastr.warning('compte d’utilisateur a été supprimé !');
          this.getData();
               },
          error => console.log(error));
    }}
          selectData(item : User){
            this.crudApi.choixmenu = "M";
            this.crudApi.dataForm = this.fb.group(Object.assign({},item));
           const dialogConfig = new MatDialogConfig();
           dialogConfig.autoFocus = true;
           dialogConfig.disableClose = true;
           dialogConfig.width = "25%";
           this.matDialog.open(AdduserComponent, dialogConfig);
           
            
          }
          
  
      
  }
  
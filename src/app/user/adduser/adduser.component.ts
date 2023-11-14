import { Component, OnInit ,Inject} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';
import { Etat } from '../../model/etat';
import { EtatService } from '../../service/etat.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  user: User = new User();
  idRole:Role;
  idEtat:Etat;
  EtatList : Etat[];
  RoleList : Role[];
  control : FormControl = new FormControl('');
  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AdduserComponent>,
    public roleService : RoleService,
    public etatService : EtatService,
   
   ) { }
   get f() { return this.crudApi.dataForm.controls;}

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    
     this.etatService.getAll().subscribe(response => {this.EtatList= response;     });
        this.roleService.getAll().subscribe(response => {this.RoleList= response;     });
       
  }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
     
    firstname : ['', [Validators.required]],
    lastname :['', [Validators.required]],
    email : ['', [Validators.required]],
    phone : ['', [Validators.required]],
    login : ['', [Validators.required]],
    password :['', [Validators.required]],
    idEtat : ['', [Validators.required]],
    idRole: ['', [Validators.required]],
    
          
        });
    }
   
  

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
    this.dialogRef.close();
    this.crudApi.getAll().subscribe(
      response => {this.crudApi.getData = response;}
    );
    this.router.navigate(['/users']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
    this.crudApi.getAll().subscribe(
      response => {this.crudApi.listData = response;}
    );
    this.toastr.success( 'Ajout Faite avec Success');
    
   
    
    
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.crudApi.getAll().subscribe(
        response => {this.crudApi.listData = response;}
      );
      this.toastr.success( 'Modification Faite avec Success');
     this.ResetForm();
   
      
     
      
    });

  }
 

}

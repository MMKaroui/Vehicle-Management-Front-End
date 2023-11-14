import { Component, OnInit ,Inject} from '@angular/core';
import {RoleService} from '../../service/role.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../model/role';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-role',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.scss']
})
export class AddroleComponent implements OnInit {
  RoleList : Role[];
  constructor(public crudApi: RoleService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddroleComponent>,
    
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
     
     
      desc_role : ['', [Validators.required]],
      lib_role : ['', [Validators.required]],
          
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
    
      this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    this.router.navigate(['/roles']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    
    this.router.navigate(['/roles']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idRole,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
      this.dialogRef.close();
    
      this.crudApi.getAll().subscribe(response => {this.RoleList= response;     } );
    
      
     
      
    });

  }}

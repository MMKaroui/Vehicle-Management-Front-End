import { Component, OnInit ,Inject} from '@angular/core';
import {TypeCarburantService} from '../../service/type-carburant.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { TypeCarburant } from '../../model/type-carburant';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-addtypecarburant',
  templateUrl: './addtypecarburant.component.html',
  styleUrls: ['./addtypecarburant.component.scss']
})
export class AddtypecarburantComponent implements OnInit {

  TypeCarburantList : TypeCarburant[];
  constructor(public crudApi: TypeCarburantService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddtypecarburantComponent>,
    
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
     
      lib_type_carburant : ['', [Validators.required]],
      
       
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
    this.router.navigate(['/typeCarburants']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    
    this.router.navigate(['/typeCarburants']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idTypeCarburant,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
      this.dialogRef.close();
    
      this.crudApi.getAll().subscribe(response => {this.TypeCarburantList= response;     } );
    
      
     
      
    });

  }}

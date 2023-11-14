import { Component, OnInit ,Inject} from '@angular/core';
import {TypeReparationService} from '../../service/type-reparation.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { TypeReparation } from '../../model/type-reparation';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-addtypereparation',
  templateUrl: './addtypereparation.component.html',
  styleUrls: ['./addtypereparation.component.scss']
})
export class AddtypereparationComponent implements OnInit {

  TypeReparationList : TypeReparation[];
  constructor(public crudApi: TypeReparationService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddtypereparationComponent>,
    
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
     
      lib_type_reparation : ['', [Validators.required]],
      
       
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
    this.router.navigate(['/typeReparations']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    
    this.router.navigate(['/typeReparations']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idTypeReparation,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
      this.dialogRef.close();
    
      this.crudApi.getAll().subscribe(response => {this.TypeReparationList= response;     } );
    
      
     
      
    });

  }}

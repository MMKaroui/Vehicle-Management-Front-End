import { Component, OnInit ,Inject} from '@angular/core';
import {AtelierService} from '../../service/atelier.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { Atelier } from '../../model/atelier';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-addatelier',
  templateUrl: './addatelier.component.html',
  styleUrls: ['./addatelier.component.scss']
})
export class AddatelierComponent implements OnInit {
  
  AtelierList : Atelier[];
  constructor(public crudApi: AtelierService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddatelierComponent>,
    
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
     
     
  num_registre : ['', [Validators.required]],
  nom_atelier : ['', [Validators.required]],
  phone_atelier : ['', [Validators.required]],
  email_atelier : ['', [Validators.required]],
  fax_atelier : ['', [Validators.required]],
  adrersse_atelier : ['', [Validators.required]],
  desc_atelier : ['', [Validators.required]],
      
       
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
    this.router.navigate(['/ateliers']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    
    this.router.navigate(['/ateliers']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idAtelier,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
      this.dialogRef.close();
    
      this.crudApi.getAll().subscribe(response => {this.AtelierList= response;     } );
    
      
     
      
    });

  }}

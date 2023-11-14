import { Component, OnInit ,Inject} from '@angular/core';
import {FabricantService} from '../../service/fabricant.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { Fabricant } from '../../model/fabricant';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-addfabricant',
  templateUrl: './addfabricant.component.html',
  styleUrls: ['./addfabricant.component.scss']
})
export class AddfabricantComponent implements OnInit {
  FabricantList : Fabricant[];
  constructor(public crudApi: FabricantService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddfabricantComponent>,
    
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
     
      lib_fabricant : ['', [Validators.required]],
      adresse_fabricant : ['', [Validators.required]],
      email_fabricant : ['', [Validators.required]],
      phone_fabricant : ['', [Validators.required]],
      site_web : ['', [Validators.required]],   
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
    this.router.navigate(['/fabricants']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response => {this.crudApi.listData= response;     }
    );
    
    this.router.navigate(['/fabricants']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idFabricant,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
      this.dialogRef.close();
    
      this.crudApi.getAll().subscribe(response => {this.FabricantList= response;     } );
    
      
     
      
    });

  }}
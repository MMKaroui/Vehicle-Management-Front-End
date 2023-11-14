import { Component, OnInit ,Inject} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { Marque } from '../../model/marque';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MarqueService } from '../../service/marque.service';
import { FabricantService } from '../../service/fabricant.service';
import { Fabricant } from '../../model/fabricant';


@Component({
  selector: 'app-addmarque',
  templateUrl: './addmarque.component.html',
  styleUrls: ['./addmarque.component.scss']
})
export class AddmarqueComponent implements OnInit {
 marque: Marque = new Marque();
  idFabricant:Fabricant;
  FabricantList : Fabricant[];
 
  control : FormControl = new FormControl('');
  constructor(public crudApi: MarqueService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddmarqueComponent>,
    public fabricantService : FabricantService,
  
   
   ) { }
   
   get f() { return this.crudApi.dataForm.controls;}

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    
     this.fabricantService.getAll().subscribe(response => {this.FabricantList= response;     });
        
       
  } 
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
     
      lib_Modele : ['', [Validators.required]],
    
    idFabricant: ['', [Validators.required]],
    
          
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
    this.router.navigate(['/marques']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(
      response => {this.crudApi.getData = response;}
    );
    
    this.router.navigate(['/marques']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
     this.ResetForm();
   
      
     
      
    });

  }
 

}


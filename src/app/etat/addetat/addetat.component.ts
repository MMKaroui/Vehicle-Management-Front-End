
import { Component, OnInit ,Inject} from '@angular/core';
import { EtatService} from '../../service/etat.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { Etat} from '../../model/Etat';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-etat',
  templateUrl: './addetat.component.html',
  styleUrls: ['./addetat.component.scss']
})
export class AddetatComponent implements OnInit {
  EtatList : Etat[];
 
  constructor(public crudApi: EtatService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data  ,
    public dialogRef:MatDialogRef<AddetatComponent>,
   ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
       }


  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
      lib_etat : ['', [Validators.required]],
      desc_etat : ['', [Validators.required]],
        
          
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
    this.router.navigate(['/etats']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
    
    this.toastr.success( 'Ajout Faite avec Success');
    
    
    this.crudApi.getAll().subscribe(
      response => {this.crudApi.getData = response;}
      
    );
    
    this.router.navigate(['/etats']);
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idEtat,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/etats']); 
    });
//  this.toastr.success( 'Modification Faite avec Success');
  }}

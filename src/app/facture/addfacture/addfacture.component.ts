import { Component, OnInit ,Inject} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { FactureService } from '../../service/facture.service';
import { Facture } from '../../model/facture';
import { Atelier } from '../../model/atelier';
import { Vehicule } from '../../model/vehicule';
import { TypeReparation } from '../../model/type-reparation';
import { AtelierService } from '../../service/atelier.service';
import { TypeReparationService } from '../../service/type-reparation.service';
import { VehiculeService } from '../../service/vehicule.service';

@Component({
  selector: 'app-addfacture',
  templateUrl: './addfacture.component.html',
  styleUrls: ['./addfacture.component.scss']
})
export class AddfactureComponent implements OnInit {

  facture: Facture = new Facture();
  idVehicule:Vehicule;
  VehiculeList : Vehicule[];
  idAtelier:Atelier;
  AtelierList : Atelier[];
  idTypeReparation:TypeReparation;
  TypeReparationList : TypeReparation[];
  
  control : FormControl = new FormControl('');
  constructor(public crudApi: FactureService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddfactureComponent>,
    public atelierService : AtelierService,
    public typeReparationService : TypeReparationService,public vehiculeService : VehiculeService,
   
   ) { }
   get f() { return this.crudApi.dataForm.controls;}

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    
     this.vehiculeService.getAll().subscribe(response => {this.VehiculeList= response;     });
        this.atelierService.getAll().subscribe(response => {this.AtelierList= response;     });
        this.typeReparationService.getAll().subscribe(response => {this.TypeReparationList= response;     });       
  }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
     
      num_facture : ['', [Validators.required]],
      date_facture :['', [Validators.required]],
      total : ['', [Validators.required]],
      observation : ['', [Validators.required]],
      idAtelier : ['', [Validators.required]],
      idVehicule :['', [Validators.required]],
      idTypeReparation : ['', [Validators.required]],
    
    
          
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
    this.router.navigate(['/factures']);
   
}
  
   

addData() {
 
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Ajout Faite avec Success');
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(
      response => {this.crudApi.getData = response;}
    );
    
    this.router.navigate(['/factures']);
   
    
    
   
   
   
    

  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.idFacture,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
     this.ResetForm();
   
      
     
      
    });

  }
 

}


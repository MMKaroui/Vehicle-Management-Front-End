import { Component, OnInit ,Inject} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, FormControlName }
from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MarqueService } from '../../service/marque.service';
import { Marque } from '../../model/marque';
import { FabricantService } from '../../service/fabricant.service';
import { Fabricant } from '../../model/fabricant';
import { TypeVehiculeService } from '../../service/type-vehicule.service';
import { TypeVehicule } from '../../model/typeVehicule';
import { VehiculeService } from '../../service/vehicule.service';
import { Vehicule } from '../../model/vehicule';
import { TypeCarburant } from 'src/app/model/type-carburant';
import { TypeCarburantService } from 'src/app/service/type-carburant.service';

@Component({
  selector: 'app-addvehicule',
  templateUrl: './addvehicule.component.html',
  styleUrls: ['./addvehicule.component.scss']
})
export class AddvehiculeComponent implements OnInit {
  vehicule: Vehicule = new Vehicule();
   idFabricant:Fabricant;
   FabricantList : Fabricant[];
   //idModele:any={};
   MarqueList :  any;
   idTypeVehicule:TypeVehicule;
   TypeVehiculeList : TypeVehicule[];
   idTypeCarburant:TypeCarburant;
   TypeCarburantList : TypeCarburant[];
   

 
  
   control : FormControl = new FormControl('');
   constructor(public crudApi: VehiculeService ,public fb: FormBuilder,public toastr: ToastrService,private router : Router,
     @Inject(MAT_DIALOG_DATA)  public data : any,
     public dialogRef:MatDialogRef<AddvehiculeComponent>,
     public fabricantService : FabricantService, public marqueService : MarqueService,
     public typeVehiculeService : TypeVehiculeService,  public typeCarburantService : TypeCarburantService,
   
    
    ) { }
    
    get f() { return this.crudApi.dataForm.controls;}
 
   ngOnInit() {
   
     if (this.crudApi.choixmenu == "A")
     {this.infoForm()};
     
      this.fabricantService.getAll().subscribe(response => {this.FabricantList= response;     });
      //this.marqueService.getAll().subscribe(response => {this.MarqueList= response;     });
      this.typeVehiculeService.getAll().subscribe(response => {this.TypeVehiculeList= response;     });
      this.typeCarburantService.getAll().subscribe(response => {this.TypeCarburantList= response;     });
           
        
   } 
   
   infoForm() {
     this.crudApi.dataForm = this.fb.group({ 
      

      num_vehicule : ['', [Validators.required]],
      num_chassis : ['', [Validators.required]],
      nbr_chv : ['', [Validators.required]],
      date_circulation : ['', [Validators.required]],
      idFabricant: ['', [Validators.required]],
     idModele: ['', [Validators.required]],
     idTypeVehicule: ['', [Validators.required]],
     idTypeCarburant: ['', [Validators.required]],
     
           
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
     this.router.navigate(['/vehicules']);
    
 }
   
    
 
 addData() {
  
   this.crudApi.createData(this.crudApi.dataForm.value).
   subscribe( data => {
     this.toastr.success( 'Ajout Faite avec Success');
     this.dialogRef.close();
     
     this.crudApi.getAll().subscribe(
       response => {this.crudApi.getData = response;}
     );
     
     this.router.navigate(['/vehicules']);
    
     
     
    
    
    
     
 
   });
 }
   updateData()
   {
   
     this.crudApi.updatedata(this.crudApi.dataForm.value.idVehicule,this.crudApi.dataForm.value).
     subscribe( data => {
       this.toastr.success( 'Modification Faite avec Success');
      this.ResetForm();
    
       
      
       
     });
 
   }
   onSelectFabricant(id: Fabricant)
      {    
     this.marqueService.listFabricant(id.idFabricant).subscribe(
       response =>{this.MarqueList = response;}
       
      );  
      
     // console.log(obj);
     console.log(id);
      
   } 
   
 
 }
 
 

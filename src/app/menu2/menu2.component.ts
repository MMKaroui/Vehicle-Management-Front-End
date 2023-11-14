import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../service/user.service';
import { User} from '../model/user';



import { LoginComponent } from '../user/login/login.component';
import { Observable } from 'rxjs';


import { ToastrService } from 'ngx-toastr';
import { Vehicule} from '../model/vehicule';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { MatIconModule } from '@angular/material/icon';
import { VehiculeService } from '../service/vehicule.service';
import { FactureService } from '../service/facture.service';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.scss']
})
export class Menu2Component implements OnInit {

  
  
  utilisateur : User;
  listData: Observable<User[]>;
  
  coutvehicule :any;
  TotalCout:any;
  Vehicule : Vehicule;
  listData2 : Observable<Vehicule[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any, public factureService: FactureService, public userService :UserService,
      ){}
  ngOnInit(){
    this.getData();
      this.factureService.getCoutTotalsVehicule().subscribe(
      response =>{this.TotalCout = response;} );
    
  }
  
 
  getData(){
    this.listData = this.crudApi.getAll();
    
    
  }
 
  onSelectVehicule(id: Vehicule)
  {    
 this.factureService.getCoutTotals(id.idVehicule).subscribe(
   response =>{this.coutvehicule = response;}
   
  );  
   
  }  
     
  
      
  
  logOut(){
  /*this.userService.islogin = false;
 
  this.userService.admin = false;
  this.userService.editeur = false;
  this.userService.editeur1 = false;*/
  localStorage.removeItem("login");
  this.router.navigate(["/login"])
  }

}

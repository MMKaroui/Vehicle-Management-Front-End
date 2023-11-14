import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../service/user.service';
import { User} from '../model/user';

import { LoginComponent } from '../user/login/login.component';
import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VehiculeService } from '../service/vehicule.service';
import { FormBuilder } from '@angular/forms';
import { FactureService } from '../service/facture.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

utilisateur : User;
  listData : Observable<User[]>;
 public  coutEn :number ;
 public coutMe : number;
 public coutEl :number;
 public coutTo : number;
 public  coutVF :number ;
 public coutVS : number;
 public countVS :number;
 public countVF : number;
 public countV : number;
 public coutToTal : number;
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
    private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any, public factureService: FactureService, public userService :UserService,
     ){
      
     
     }
  
  ngOnInit() {
    this.factureService.getCoutTotalsVehicule().subscribe(
      response =>{this.coutToTal = response; } );
    this.factureService.getCoutTotalTo().subscribe(
      response =>{this.coutTo = response; } );
      this.factureService.getCoutTotalEn().subscribe(
      response =>{this.coutEn = response;} );
      this.factureService.getCoutTotalMe().subscribe(
      response =>{this.coutMe = response;} );
      this.factureService.getCoutTotalEl().subscribe(
      response =>{this.coutEl = response;} );
      this.factureService.getCoutTotalFonction().subscribe(
        response =>{this.coutVF = response;} );
        this.factureService.getCoutTotalService().subscribe(
        response =>{this.coutVS = response;} );


      this.crudApi.getCountVS().subscribe(
        response =>{this.countVS = response; } );
      this.crudApi.getCountVF().subscribe(
      response =>{this.countVF = response;} );
      this.crudApi.getCountV().subscribe(
        response =>{this.countV = response;} );
      
    
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

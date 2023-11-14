import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { ListuserComponent } from './user/listuser/listuser.component';
import { AddetatComponent } from './etat/addetat/addetat.component';
import { ListetatComponent } from './etat/listetat/listetat.component';
import { AddroleComponent } from './role/addrole/addrole.component';
import { ListroleComponent } from './role/listrole/listrole.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from "@angular/common";
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DatePipe } from '@angular/common';
import { LoginComponent } from './user/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { MenuComponent } from './menu/menu.component';
import { Menu2Component } from './menu2/menu2.component';
import { AddmarqueComponent } from './marque/addmarque/addmarque.component';
import { ListmarqueComponent } from './marque/listmarque/listmarque.component';

import { ListfabricantComponent } from './fabricant/listfabricant/listfabricant.component';
import { AddvehiculeComponent } from './vehicule/addvehicule/addvehicule.component';
import { ListvehiculeComponent } from './vehicule/listvehicule/listvehicule.component';
import { AddtypevehiculeComponent } from './typeVehicule/addtypevehicule/addtypevehicule.component';
import { ListtypevehiculeComponent } from './typeVehicule/listtypevehicule/listtypevehicule.component';
import { AddfabricantComponent } from './fabricant/addfabricant/addfabricant.component';
import { AddtypecarburantComponent } from './typeCarburant/addtypecarburant/addtypecarburant.component';
import { ListtypecarburantComponent } from './typeCarburant/listtypecarburant/listtypecarburant.component';
import { AddtypereparationComponent } from './typeReparation/addtypereparation/addtypereparation.component';
import { ListtypereparationComponent } from './typeReparation/listtypereparation/listtypereparation.component';
import { AddfactureComponent } from './facture/addfacture/addfacture.component';
import { ListfactureComponent } from './facture/listfacture/listfacture.component';
import { AddatelierComponent } from './atelier/addatelier/addatelier.component';
import { ListatelierComponent } from './atelier/listatelier/listatelier.component';
import { EtatVehiculesComponent } from './etat-vehicules/etat-vehicules.component';
import { ChartComponent } from './statistique/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './statistique/pie-chart/pie-chart.component';
import { ChartsComponent } from './statistique/charts/charts.component';
import { OnCreateDirective } from './on-create.directive';



const MATERIAL_MODULES = [MatToolbarModule, MatIconModule ];
const appRoutes : Routes = [
  {path: '', component:MenuComponent, canActivate:[AuthGuardService], children :[
    
   
  {path: 'roles',component: ListroleComponent},
  {path: 'role',component: AddroleComponent},
  {path: 'etats',component: ListetatComponent},
  {path: 'etat',component: AddetatComponent},
  {path: 'users',component: ListuserComponent},
  {path: 'user',component: AdduserComponent},
  {path: 'fabricants',component: ListfabricantComponent},
  {path: 'fabricant',component: AddfabricantComponent},
  {path: 'marques',component: ListmarqueComponent},
  {path: 'marque',component: AddmarqueComponent},
  {path: 'typeVehicules',component: ListtypevehiculeComponent},
  {path: 'typeVehicule',component: AddtypevehiculeComponent},
  {path: 'vehicules',component: ListvehiculeComponent},
  {path: 'vehicule',component: AddvehiculeComponent},
  {path: 'typeCarburants',component: ListtypecarburantComponent},
  {path: 'typeCarburant',component: AddtypecarburantComponent},
  {path: 'typeReparations',component: ListtypereparationComponent},
  {path: 'typeReparation',component: AddtypereparationComponent},
  {path: 'ateliers',component: ListatelierComponent},
  {path: 'atelier',component: AddatelierComponent},
  {path: 'factures',component: ListfactureComponent},
  {path: 'facture',component: AddfactureComponent},
   {path: 'chart',component: ChartComponent},
  {path: 'pie',component: PieChartComponent},
  
]},
/* {path: 'responsable', component:Menu2Component, canActivate:[AuthGuardService], children :[
    
  
  {path: 'vehicules',component: ListvehiculeComponent},
  {path: 'vehicule',component: AddvehiculeComponent},
  {path: 'marques',component: ListmarqueComponent},
  {path: 'marques',component: AddmarqueComponent},
  {path: 'typeVehicules',component: ListtypevehiculeComponent},
  {path: 'typeVehicule',component: AddtypevehiculeComponent},

]}, */


{path: 'etatvehicules',component: EtatVehiculesComponent},
{path: 'login',component: LoginComponent},
{path: 'menu2',component: Menu2Component},

];
@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    ListuserComponent,
    AddetatComponent,
    ListetatComponent,
    AddroleComponent,
    ListroleComponent,
    LoginComponent,
    MenuComponent,
    Menu2Component,
    AddmarqueComponent,
    ListmarqueComponent,
     
    ListfabricantComponent,
    AddvehiculeComponent,
    ListvehiculeComponent,
    ListtypevehiculeComponent,
    AddtypevehiculeComponent,
    AddfabricantComponent,
    AddtypecarburantComponent,
    ListtypecarburantComponent,
    AddtypereparationComponent,
    ListtypereparationComponent,
    AddfactureComponent,
    ListfactureComponent,
    AddatelierComponent,
    ListatelierComponent,
    EtatVehiculesComponent,
    ChartComponent,
    PieChartComponent,
    ChartsComponent,
    OnCreateDirective
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    ChartsModule,
   
    
    

   
    
  ],
  providers: [ DatePipe, { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

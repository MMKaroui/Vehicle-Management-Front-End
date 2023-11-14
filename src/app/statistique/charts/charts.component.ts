import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../../service/user.service';
import { User} from '../../model/user';
import * as _ from 'lodash';
import { Chart } from 'chart.js';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { LoginComponent } from '../../user/login/login.component';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Vehicule} from '../../model/vehicule';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { MatIconModule } from '@angular/material/icon';
import { VehiculeService } from '../../service/vehicule.service';
import { FactureService } from '../../service/facture.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input('coutEn') type =''  ;
  @Input('my-id') myId =''  ;
  @Input('coutEn') coutEn : number  ;
  @Input('coutMe') coutMe  : number ;
  @Input('coutEl') coutEl  : number ;
  @Input('coutTo') coutTo : number ;
  coutvehicule :any;
  TotalCout:any;
  Vehicule : Vehicule;
  listData : Observable<Vehicule[]>;
  control : FormControl = new FormControl('');
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any, public factureService: FactureService,
      ){
       
      }
  
   
    ngOnInit(){
      var myChart = new Chart(this.myId, {
        type: 'pie',
        data: {
            labels:  ['Mécanique','Entretien','Tôlerie','Electrique'],
             datasets:[{
                label: 'Coût de réparation par Type',
                data: [this.coutMe,this.coutEn,this.coutTo,this.coutEl],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  ticks:{
                    beginAtZero: true
                }
            }]
        }}
    });
    
  }
  
  ngAfterViewInit(){
   

   

  }
  
 
  }
import { Component, OnInit,Inject, Input } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Vehicule} from '../../model/vehicule';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import {Chart, ChartPoint} from 'chart.js'

import { MatIconModule } from '@angular/material/icon';
import { VehiculeService } from '../../service/vehicule.service';
import { FactureService } from '../../service/facture.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit   {

  @Input('type') public type ='pie'  ;
  @Input('my-id') public  myId =''  ;
  @Input('coutVS') public coutVS: number | number[]   ;
  @Input('coutVF') public coutVF: number | number[]     ;



  

 
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
    private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data1: any, public factureService: FactureService,
      ){}
     
  ngOnInit(){
   
      }
      ngOnChanges(){
        this.makeChart();
      }
 
    ngAfterViewInit(){
     

    }
  
     makeChart(){
      new Chart(this.myId, {
        type: this.type,
        data: {
            labels:  ['Service','Fonction'],
             datasets:[{
                label: 'Coût par Type Véhicule',
                data: [this.coutVS,this.coutVF],
                backgroundColor: [
                  'rgba(142, 81, 53, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
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
  
      
  }
  
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
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input('type') public type ='line'  ;
  @Input('my-id') public  myId =''  ;
  @Input('coutEn') public coutEn: number | number[]   ;
  @Input('coutMe') public coutMe: number | number[]     ;
  @Input('coutEl')public  coutEl: number | number[]    ;
  @Input('coutTo') public coutTo: number | number[]    ;
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
            labels:  ['Mécanique','Entretien','Tôlerie','Electrique'],
             datasets:[{
                label: 'Coût de réparation par Type',
                data: [this.coutMe,this.coutEn,this.coutTo,this.coutEl],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
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
  
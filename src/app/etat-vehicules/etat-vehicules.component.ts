import { Component, OnInit,Inject, Input, OnChanges, AfterViewInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Vehicule} from '../model/vehicule';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _ from 'lodash';

import { MatIconModule } from '@angular/material/icon';
import { VehiculeService } from '../service/vehicule.service';
import { FactureService } from '../service/facture.service';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { element } from 'protractor';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-etat-vehicules',
  templateUrl: './etat-vehicules.component.html',
  styleUrls: ['./etat-vehicules.component.scss']
})
export class EtatVehiculesComponent implements OnInit, OnChanges,AfterViewInit {
  
  @Input('countV') public countV: number | number[]   ;

  coutvehicule :number;


  coutvehicule2 :number;
  TotalCout:any;
  Vehicule : Vehicule;
  listData : Observable<Vehicule[]>;
  List:Vehicule[];
  obsevableResponseArray: Array<any> = [];
  
  control : FormControl = new FormControl('');
  constructor(public crudApi : VehiculeService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
     private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any, public factureService: FactureService,
      ){}
  
 
  ngOnInit(){
   
    this.getData();
    this.getData1();
   
     
  
     
  }
  ngAfterViewInit(){
     
    
  }
 
  ngOnChanges(){
   this.CoutByVehicule();
  }
CoutByVehicule(){
  for (let i = 0; i < this.countV; i++) {
        
    this.factureService.getCoutTotals(i+1)
      .subscribe(data => {
        this.obsevableResponseArray.push(data);
      });}
}
 
  getData(){
    this.listData = this.crudApi.getAll();
    
        
  }
  getData1(){
    this.crudApi.getAll().subscribe(
      response=>{ this.List=response;});
    
        
  }
 
 
  generatePdf1(){
  /*  pdfMake(("#tabledata")[0],{
      onrendered:function(canvas){
        var data=canvas.toDataURL();
        var docDefinition={
          content:[{
            image:data,
            width:500
          }]
        };
        pdfMake.createPdf(docDefinition).open();
      }
    })
    */
    

  }
    
     generatePdf()
     {
       
     const document = this.getDocument();
      
     pdfMake.createPdf(document).open(); 
     
     }
     
     getDocument() {
      {
       
      return {
        pageSize : 'A4',
        pageOrientation : 'landscape',
        footer: function (currentPage, pageCount) {
          return {
              table: {
                  body: [
                      [
                        //  { image: 'sampleImage.jpg', alignment: 'center', fit: [400, 400] },
                          { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText', margin: [400, 20, 50, 0] }
                      ],
                  ]
              },
              layout: 'noBorders'
          };
      },
        content: [
          {
            columns: [
              [{
                text: "Ministère de L'éducation" ,
                style: 'name'
              },
              {
                text: 'Service Parc-Auto'
              },
              {
                text: 'Email : parc@gmail.com' ,
              },
              {
                text: 'Tel  : 71 980 536' ,
                
              },
              ],
            ]
          },
          {
            text: 'Etat des Véhicules',
            bold: true,
            fontSize: 18,
            alignment: 'center',
            color: 'blue',
            margin: [20, 20, 20, 20]
          },
          this.getList(this.List),
          {
           

          },
          
          {
            text: 'Le Directeur',
            style: 'sign',
            alignment : 'right'
  
          },
         
        ],
       
          styles: {
            header: {
              fontSize: 14,
              bold: true,
              margin: [10, 10, 10, 10],
              decoration: 'underline'
            },
            name: {
              fontSize: 12,
              bold: true
            },
            total: {
              fontSize: 10,
              bold: true,
              italics: true
            },
            ligne: {
              fontSize: 10,
              bold: false,
              italics: true
            },
            sign: {
              margin: [0, 10, 0, 10],
              alignment: 'right',
              italics: true
            },
            tableHeader: {
              bold: true,
              alignment: 'center',
              fontSize: 12
            }
             
          }
      };
    }
     }
  
     getList(items: Vehicule[]) {
      return {
        table: {
          widths: [60, 160, 70, 140, 70, 50, 50, 70],
          body: [
            [{
              text: 'Numéro',
              style: 'tableHeader'
            },
            {
              text: 'Chassis',
              style: 'tableHeader'
            },
            {
              text: 'Nombre Chv',
              style: 'tableHeader'
            },
            {
              text: 'Date de circulation',
              style: 'tableHeader'
            },
            {
              text: 'Fabricant',
              style: 'tableHeader'
            },
            {
              text: 'Marque',
              style: 'tableHeader'
            },
            {
              text: 'Type',
              style: 'tableHeader'
            },
            {
              text: 'Carburant',
              style: 'tableHeader'
            },
            
            ],
           ...items.map(ed => {
              return [ed.num_vehicule, ed.num_chassis, ed.nbr_chv, ed.date_circulation, ed.idFabricant.lib_fabricant, ed.idModele.lib_Modele,  ed.idTypeVehicule.lib_type_vehicule,  ed.idTypeCarburant.lib_type_carburant];
            })
          ]
        }
      };
    }
  }
  

import { Component, OnInit,Inject } from '@angular/core';
import { EtatService} from '../../service/etat.service';
import { ToastrService } from 'ngx-toastr';
import { Etat} from '../../model/etat';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddetatComponent } from '../addetat/addetat.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list-etat',
  templateUrl: './listetat.component.html',
  styleUrls: ['./listetat.component.scss']
})
export class ListetatComponent implements OnInit {
 

Etat : Etat;
listData : Observable<Etat[]>;
control : FormControl = new FormControl('');
constructor(public crudApi : EtatService, public toastr : ToastrService, public fb: FormBuilder, private router : Router,
   private matDialog : MatDialog,  @Inject (MAT_DIALOG_DATA) public data: any,
   public dialogRef:MatDialogRef<AddetatComponent>, ){}
ngOnInit(){
  this.getData();
}

addetat()
{this.crudApi.choixmenu = "A";
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=true;
  dialogConfig.disableClose=true;
  dialogConfig.width="50%";
  this.matDialog.open(AddetatComponent, dialogConfig);
}
getData(){
  this.listData = this.crudApi.getAll();
}
removeData(id:number){
  if(window.confirm('vous êtes sur vous voulez supprimer  ?')){
    this.crudApi.deleteData(id)
    .subscribe(
      data =>{
        console.log(data);
        this.toastr.warning('Etat bien supprimer');
        this.getData();
             },
        error => console.log(error));
  }}
        selectData(item : Etat){
          this.crudApi.choixmenu = "M";
          this.crudApi.dataForm = this.fb.group(Object.assign({},item));
         const dialogConfig = new MatDialogConfig();
         dialogConfig.autoFocus = true;
         dialogConfig.disableClose = true;
         dialogConfig.width = "50%";
         this.matDialog.open(AddetatComponent, dialogConfig);
         
          
        }
        

    
}

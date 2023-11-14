import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
import { DatePipe }         from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any={};

  errorMessage:string;  
  name : string;  
  
  loginForm:  FormGroup; 
  
  
  constructor(private router:Router,private userService : UserService,
    public toastr: ToastrService,public fb: FormBuilder) { }    
  ngOnInit() {    
  
     this.userService.islogin = false;
     this.userService.Adminastreur= false;
     this.userService.ChefDuParc = false;
     this.userService.ResReaparation = false;
     
     
     this.loginForm = this.fb.group({
      'login' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }    
  login() {
    const val = this.loginForm.value;
    this.userService.login(val.login, val.password).subscribe(
      res =>{
      this.user = res;
        localStorage.setItem("name", this.user.login);
       
        let jwt = "Bearer " + this.user.jwt;
          localStorage.setItem("token", jwt)
       
         this.userService.islogin = true;
        if (this.user.idRole.lib_role  == "Administrateur")
         {
         this.userService.Adminastreur = true;
          this.router.navigate(['/users']);
      }
      if (this.user.idRole.lib_role == "Responsable de réparation ")
         {
         this.userService.ResReaparation = true;
          this.router.navigate(['/vehicules']);
      }
      if (this.user.idRole.lib_role  == "Chef du parc")
      {
      this.userService.ChefDuParc = true;
       this.router.navigate(['/']);
   }
      
          },
          error => 
          
            this.toastr.warning( 'Login Incorrecte ')
         
          
          );
        }
     
        
        
        logOut() {
          localStorage.removeItem("login");
        }
 
        logout() {
          // remove user from local storage and set current user to null
          localStorage.removeItem('name');
          
      }

 

   
  
}

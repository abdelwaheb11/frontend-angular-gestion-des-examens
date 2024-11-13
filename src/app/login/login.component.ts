import { Component } from '@angular/core';
import User from '../model/model.user';
import { FormsModule } from '@angular/forms';
import { AuthiserviceService } from '../service/authiservice.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user : User = new User()
  error : boolean =false;
  message : string = "login ou mot de passe erronés..";

  constructor(private authService : AuthiserviceService,private router: Router) { }
    

  login(){
    this.authService.login(this.user).subscribe(
      data=> {
        let jwToken = data.headers.get('Authorization');
        if (jwToken)
          this.authService.saveToken(jwToken );
        this.router.navigate(['/']);
      },
      error=> {
        this.error=true
        if (error.error.errorCause=='disabled')
          this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur";
      }
    );
  }
}

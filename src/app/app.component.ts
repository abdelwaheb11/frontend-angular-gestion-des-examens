import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthiserviceService } from './service/authiservice.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gestion_examens';

  constructor(private router : Router , private authiservice : AuthiserviceService ){}

  ngOnInit(): void {
    this.authiservice.loadToken();
    if (this.authiservice.getToken()==null || this.authiservice.isTokenExpired())
      this.router.navigate(['/login']);
    

  }
  
}

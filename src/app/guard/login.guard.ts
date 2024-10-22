import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthiserviceService } from '../service/authiservice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthiserviceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.loadToken();
    if (this.authService.getToken()!=null && !this.authService.isTokenExpired()) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }
}
  


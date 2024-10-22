import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthiserviceService } from '../service/authiservice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitGuard implements CanActivate {

  constructor(
    private authService: AuthiserviceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['forbidden']);
      return false;
    }
  }
}
  


import { Injectable } from '@angular/core';
import User from '../model/model.user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthiserviceService {
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  apiURL: string = 'http://localhost:8081/users';
  token!:string;
  private helper = new JwtHelperService();


  constructor(private router: Router , private http: HttpClient ) { }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }

  login(user : User){
    return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
 }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  getToken():string {
    return this.token;
  }


  decodeJWT(){ 
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn=true;
  }

  isTokenExpired(): Boolean{
    return this.helper.isTokenExpired(this.token);
  }


  
  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >-1);
  }

  
  

}

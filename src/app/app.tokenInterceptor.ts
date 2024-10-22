import { Injectable } from "@angular/core";
import { AuthiserviceService } from "./service/authiservice.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService : AuthiserviceService) {}
    intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    const toExclude = "/login";
    //tester s'il sagit de login, on n'ajoute pas le header Authorization
    //puisqu'on a pas encode de JWT (il est null)
    if(request.url.search(toExclude) === -1){
        let jwt = this.authService.getToken()
        let reqWithToken = request.clone( {
            setHeaders: { Authorization : "Bearer "+jwt}
        })
        return next.handle(reqWithToken);
    }
    return next.handle(request);
    }
}

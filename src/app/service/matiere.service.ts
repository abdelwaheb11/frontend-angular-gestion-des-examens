import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MatiereWrapped from '../model/model.matiereWrapped';
import Matiere from '../model/model.matiere';
import { AuthiserviceService } from './authiservice.service';

@Injectable({
  providedIn: 'root'
  
})
export class MatiereService {

  private urlapi = "http://127.0.0.1:8080/api/matieres"

  setHeadres(){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return {headers:httpHeaders}
  }
  

  getAll():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(`${this.urlapi}/all`,this.setHeadres())
  }

  getById(id:number):Observable<Matiere>{
    return this.http.get<Matiere>(`${this.urlapi}/getById/${id}`,this.setHeadres())
  }

  add(m:Matiere):Observable<Matiere>{
    return this.http.post<Matiere>(`${this.urlapi}/save`,{labelle : m.labelle , coffetion : m.coffetion},this.setHeadres())
  }

  update(m:Matiere):Observable<Matiere>{
    return this.http.put<Matiere>(`${this.urlapi}/update`,{id : m.id , labelle : m.labelle , coffetion : m.coffetion},this.setHeadres())
  }

  delete(id:number):Observable<any>{
    return this.http.delete(`${this.urlapi}/delete/${id}`,this.setHeadres())
  }

  search(labelle:String):Observable<Matiere[]>{
    return this.http.get<Matiere[]>(`${this.urlapi}/matieresParLabelle/${labelle}`,this.setHeadres())
  }

  constructor(private http:HttpClient , private authService: AuthiserviceService) {

   }
}

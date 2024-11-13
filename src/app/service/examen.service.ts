import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Examen from '../model/model.examen';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ExamenParPage from '../model/model.examenParPage';
import { AuthiserviceService } from './authiservice.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private urlapi = "http://127.0.0.1:8080/api/examen"
  constructor( private http:HttpClient , private authService : AuthiserviceService) {}

  getAll():Observable<Examen[]>{
    return this.http.get<Examen[]>(`${this.urlapi}/all`,this.setHeadres())
  }

  setHeadres(){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return {headers:httpHeaders}
  }

  getAllParPage(page:Number,size:Number):Observable<ExamenParPage>{
    return this.http.get<ExamenParPage>(`${this.urlapi}/getAllParPage?page=${page}&size=${size}`,this.setHeadres())
  }

  getById(id:number):Observable<Examen>{
    return this.http.get<Examen>(`${this.urlapi}/getById/${id}`,this.setHeadres());
  }

  create(ex:Examen):Observable<Examen>{
    return this.http.post<any>(`${this.urlapi}/save`,{ etudiant: ex.etudiant, note: ex.note, date: ex.date , matiere:ex.matiere },this.setHeadres())
  }

  delete(id:number):Observable<any>{
    return this.http.delete(`${this.urlapi}/delete/${id}`, this.setHeadres())
  }

  update(ex : Examen , files : File[]):Observable<Examen>{
    const imageFormData = new FormData();
    files.forEach(file=>imageFormData.append('images', file))
    imageFormData.append('examen', new Blob([JSON.stringify(ex)], { type: 'application/json' }));
    return this.http.put<Examen>(`${this.urlapi}/update`, imageFormData ,this.setHeadres())
  }

  getExamensParMatiere(idMat:Number):Observable<Examen[]>{
    return this.http.get<Examen[]>(`${this.urlapi}/examenParMat/${idMat}`,this.setHeadres())
  }

  getExamensParEtudiant(nom:String):Observable<Examen[]>{
    return this.http.get<Examen[]>(`${this.urlapi}/examenParEtudiant/${nom}`,this.setHeadres())
  }
}

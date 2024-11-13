import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../model/model.image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthiserviceService } from './authiservice.service';





@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiURL = "http://127.0.0.1:8080/api/image"
  constructor( private http : HttpClient , private authService : AuthiserviceService) { }

  setHeadres(){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return {headers:httpHeaders}
  }

  uploadImagesExamen(files: File[], idExamen: number): Observable<Image>{
    const imageFormData = new FormData();
    files.forEach(file=>imageFormData.append('images', file))
    const url = `${this.apiURL }/uplaodImageExamen/${idExamen}`;
    return this.http.post<Image>(url, imageFormData,this.setHeadres());
  }
  getImageByExamen(id: number): Observable<Image[]> {
    const url = `${this.apiURL }/getImagesExamen/${id}`;
    return this.http.get<Image[]>(url,this.setHeadres());
  }

  deleteImageById(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/delete/${id}`,this.setHeadres())
  }

  
}

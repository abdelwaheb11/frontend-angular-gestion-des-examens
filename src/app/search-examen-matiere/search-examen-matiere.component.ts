import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Examen from '../model/model.examen';
import { ExamenService } from '../service/examen.service';
import Matiere from '../model/model.matiere';
import { FormsModule } from '@angular/forms';
import { MatiereService } from '../service/matiere.service';
import { AuthiserviceService } from '../service/authiservice.service';

@Component({
  selector: 'app-search-examen-matiere',
  standalone: true,
  imports: [NgFor , RouterLink ,FormsModule , NgIf],
  templateUrl: './search-examen-matiere.component.html',
  styleUrl: './search-examen-matiere.component.css'
})
export class SearchExamenMatiereComponent implements OnInit  {
  examens:Examen[]=[]
  matieres:Matiere[]=[]
  idMat:Number=0
  is_search:boolean=false

  constructor(private examenservice : ExamenService , private matiereservice : MatiereService , public authiservice : AuthiserviceService){}

  delete(id : number,etudiant : String){
    let v = confirm("Vous avez sur de suppremer l'examen de "+etudiant)
    if(v){
      this.examenservice.delete(id).subscribe(
        res=>{
          let index = this.examens.findIndex(e=>e.id===id)
          this.examens.splice(index,1)
        },
        error=>console.error(error)
      )
    }
  }

  getExamens(){
    this.is_search=false
    this.examenservice.getAll().subscribe(
      res=>this.examens=res,
      error=>console.error(error.message)
      
    )
  }

  search(){
    if(this.idMat!=0){
      this.is_search=true
      this.examenservice.getExamensParMatiere(this.idMat).subscribe(
      res=>this.examens=res,
      error=>console.error(error.message)
      
    )
    }
    
  }

  ngOnInit(): void {
      this.getExamens()
      this.matiereservice.getAll().subscribe(
        res=>this.matieres=res,
        error=>console.error(error.message)
      )
  }
}

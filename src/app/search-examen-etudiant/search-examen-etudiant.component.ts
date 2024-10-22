import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Examen from '../model/model.examen';
import Matiere from '../model/model.matiere';
import { ExamenService } from '../service/examen.service';
import { MatiereService } from '../service/matiere.service';
import { RouterLink } from '@angular/router';
import { AuthiserviceService } from '../service/authiservice.service';

@Component({
  selector: 'app-search-examen-etudiant',
  standalone: true,
  imports: [NgFor , FormsModule , RouterLink , NgIf],
  templateUrl: './search-examen-etudiant.component.html',
  styleUrl: './search-examen-etudiant.component.css'
})
export class SearchExamenEtudiantComponent implements OnInit {
  examens:Examen[]=[]
  nom!:String

  constructor(private examenservice : ExamenService , public authiservice:AuthiserviceService ){}

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
    this.examenservice.getAll().subscribe(
      res=>this.examens=res,
      error=>console.error(error.message)
      
    )
  }

  search(){
    if(this.nom.trim()!=='')
    this.examenservice.getExamensParEtudiant(this.nom).subscribe(
      res=>this.examens=res,
      error=>console.error(error.message)
      
    )
    
  }

  ngOnInit(): void {
      this.getExamens()
  }
}

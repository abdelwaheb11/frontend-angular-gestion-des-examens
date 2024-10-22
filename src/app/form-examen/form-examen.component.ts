import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Examen from '../model/model.examen';
import Matiere from '../model/model.matiere';
import { MatiereService } from '../service/matiere.service';
import { ExamenService } from '../service/examen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-examen',
  standalone: true,
  imports: [FormsModule , NgFor , NgIf],
  templateUrl: './form-examen.component.html',
  styleUrl: './form-examen.component.css'
})
export class FormExamenComponent implements OnInit{
  @Input() id?:number;
  etat!:string;
  idMat:number=0
  examen : Examen = new Examen();
  matiere_isValid:boolean=true;
  date_isValid:boolean=true;
  matieres!:Matiere[];
  constructor(private matiereservice:MatiereService , private examenservice:ExamenService , private router : Router){}

  changeMatiere(){
    if(this.idMat==0){
      this.matiere_isValid=false
    }else{
      this.matiere_isValid=true
      this.matiereservice.getById(this.idMat).subscribe(
        res=>this.examen.matiere=res,
        error=>console.error(error)
      )
    }
  }
  verif_date(){
    let now  = new Date().toISOString()
    if(now < new Date(this.examen.date).toISOString() ){
      this.date_isValid=false
    }else{
      this.date_isValid=true
    }
    
  }
  add(){
    this.examenservice.create(this.examen).subscribe(
      res=>this.router.navigate(["/"]),
      error=>console.error(error)
    )
  }

  edit(){
    this.examenservice.update(this.examen).subscribe(
      res=>this.router.navigate(["/"]),
      error=>console.error(error)
    )
  }

  action(){
    if(this.matiere_isValid && this.date_isValid){
      this.id ? this.edit() : this.add()
    }
  }
  
  ngOnInit(): void {
      //getAll matiere-----------------------
      this.matiereservice.getAll().subscribe(
        res=>this.matieres=res,
        error=>console.error(error.message)
      )

      //get info examen si en update-------
      if (this.id){
        this.examenservice.getById(this.id).subscribe(
          res=> {
            this.examen=res
            this.idMat=res.matiere.id
          },
          error=>console.error(error.message)
          
        )
      }


      //get etat------------------------
      this.etat= this.id ? 'Modefier' : 'Ajouter';

      
  }
}

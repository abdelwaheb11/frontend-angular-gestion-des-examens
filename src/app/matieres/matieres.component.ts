import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../service/matiere.service';
import Matiere from '../model/model.matiere';
import { AddUpdateMatiereComponent } from "../add-update-matiere/add-update-matiere.component";
import { FormsModule } from '@angular/forms';
import { AuthiserviceService } from '../service/authiservice.service';

@Component({
  selector: 'app-matieres',
  standalone: true,
  imports: [NgFor, AddUpdateMatiereComponent , FormsModule , NgIf],
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css'
})
export class MatieresComponent implements OnInit{
  matieres!:Matiere[]
  matiere:Matiere=new Matiere()
  enAjouter:boolean=true;

  search!:String;

  constructor(private matiereservice:MatiereService , public authiservice : AuthiserviceService){}

  edit(m:Matiere){
    this.matiere=m;
    this.enAjouter=false;
  }

  matiereAction(m:Matiere){
    if(this.enAjouter) {
      this.matiereservice.add(m).subscribe(res=>this.matieres.push(res))
    } else{
      this.matiereservice.update(m).subscribe(res=>{
        this.matieres.splice(this.matieres.findIndex(e=>e.id===m.id),1)
        this.matieres.push(res)
      })
      this.enAjouter=true
    }
    this.matiere=new Matiere() 
  }

  delete(id:number , labelle : string){
    let v=confirm('Vous avez sur de suppremer la matiere : '+labelle)
    if(v) this.matiereservice.delete(id).subscribe(
      res=>this.matieres.splice(this.matieres.findIndex(e=>e.id===id),1)
    )
  }

  getByLabelle(){
    if(this.search.trim()!=='')
      this.matiereservice.search(this.search).subscribe(
        res=>this.matieres=res,
        error=>console.error(error)
    )
  }

  

  ngOnInit(): void {
    this.matiereservice.getAll().subscribe(
      res=>this.matieres=res,
      error=>console.error(error.message)
    )
  }
}

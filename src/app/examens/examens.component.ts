import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Examen from '../model/model.examen';
import { ExamenService } from '../service/examen.service';
import {  RouterLink , ActivatedRoute } from '@angular/router';
import { AuthiserviceService } from '../service/authiservice.service';



@Component({
  selector: 'app-examens',
  standalone: true,
  imports: [NgFor,RouterLink,NgIf],
  templateUrl: './examens.component.html',
  styleUrl: './examens.component.css'
})
export class ExamensComponent implements OnInit {
  examens !: Examen[];
  page:number=0
  size:number=6
  totalPages!:number
  tablePages:number[]=[]
    
  constructor(private examenservice:ExamenService , public authiservice : AuthiserviceService){}

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
    this.examenservice.getAllParPage(this.page,this.size).subscribe(
      res=>{
        this.examens=res.content
        this.totalPages=res.totalPages
        localStorage.setItem('nbr_pages',this.totalPages.toString()) 
        localStorage.setItem('curant_page',this.page.toString()) 
      },
      error=>console.error(error.message)
      
    )
  }

  generTabelePages(){
    for (let index = 0; index < this.totalPages; index++) {
      this.tablePages.push(index)
      
    }
  }

  changePage(v : number){
    
    v==-1 && this.page!==0 ?  this.page+=v   : false
    v==1 && this.page!==this.totalPages-1 ? this.page+=v  : false
    localStorage.setItem('curant_page',this.page.toString()) 
    this.getExamens()
  }

  setPage(v:number){
    this.page=v
    localStorage.setItem('curant_page',this.page.toString()) 
    this.getExamens()
  }
  
  

  ngOnInit(): void {
    let curant_page = new Number(localStorage.getItem('curant_page')).valueOf()
    if(curant_page) this.page=curant_page
    this.getExamens() 
    if(!this.totalPages)this.totalPages=new Number(localStorage.getItem('nbr_pages')).valueOf()
    this.generTabelePages()
    
    
  }
}

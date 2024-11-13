import { Component, NgModule, OnInit } from '@angular/core';
import Matiere from '../model/model.matiere';
import { MatiereService } from '../service/matiere.service';
import { NgFor, NgIf } from '@angular/common';
import Examen from '../model/model.examen';
import { FormsModule, NgForm } from '@angular/forms';
import { FormExamenComponent } from '../form-examen/form-examen.component';

@Component({
  selector: 'app-add-examens',
  standalone: true,
  imports: [  NgIf , NgFor ,FormsModule ,FormExamenComponent] ,
  templateUrl: './add-examens.component.html',
  styleUrl: './add-examens.component.css'
})
export class AddExamensComponent implements OnInit {

  constructor( ){}

  
  
  ngOnInit(): void {
      
  }
}

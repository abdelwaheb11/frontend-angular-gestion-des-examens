import { Component, OnInit } from '@angular/core';
import { FormExamenComponent } from '../form-examen/form-examen.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-examen',
  standalone: true,
  imports: [ FormExamenComponent],
  templateUrl: './update-examen.component.html',
  styleUrl: './update-examen.component.css'
})
export class UpdateExamenComponent implements OnInit {
  id!:number;
  constructor(private actRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.id=this.actRoute.snapshot.params['id']
  }
}

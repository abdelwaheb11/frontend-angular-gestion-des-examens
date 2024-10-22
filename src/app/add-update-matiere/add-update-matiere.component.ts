import { Component , EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Matiere from '../model/model.matiere';

@Component({
  selector: 'app-add-update-matiere',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-update-matiere.component.html',
  styleUrl: './add-update-matiere.component.css'
})
export class AddUpdateMatiereComponent {
  @Input() matiere!:Matiere
  @Input() enAjouter!:boolean

  @Output()matiereAction = new EventEmitter<Matiere>();

  action(){
    this.matiereAction.emit(this.matiere);
  }
  

  
  
}

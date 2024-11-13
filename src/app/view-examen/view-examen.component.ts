import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../service/examen.service';
import { ImageService } from '../service/image.service';
import { ActivatedRoute } from '@angular/router';
import Examen from '../model/model.examen';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-view-examen',
  standalone: true,
  imports: [NgFor,NgIf , UpperCasePipe ],
  templateUrl: './view-examen.component.html',
  styleUrl: './view-examen.component.css'
})
export class ViewExamenComponent  implements OnInit {

  examen!:Examen;

  constructor(private examenserviec: ExamenService , private imageservice : ImageService , private actrout:ActivatedRoute){

  }

  zoomImage(image : string){

  }

  ngOnInit(): void {
    this.examenserviec.getById(this.actrout.snapshot.params['id']).subscribe(
      res=> {
        this.examen=res
        this.imageservice.getImageByExamen(this.examen.id).subscribe(
          resImage=>{
            this.examen.images=resImage
            this.examen.images.forEach(e=>{
              e.imageStr = 'data:' + e.type + ';base64,' + e.image;
            })
          }
        )
      },
      error=>console.error(error.message)
      
    )
  }
  

}

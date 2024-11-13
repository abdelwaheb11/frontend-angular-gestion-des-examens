import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import User from '../model/model.user';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthiserviceService } from '../service/authiservice.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscrit',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf,RouterLink,ToastrModule],
  templateUrl: './inscrit.component.html',
  styleUrl: './inscrit.component.css'
})
export class InscritComponent implements OnInit {
  public user = new User();
  confirmPassword?:string;
  myForm!: FormGroup;
  err?:string;
  loading:boolean=false
  constructor(private formBuilder: FormBuilder , private authSerice : AuthiserviceService ,
     private router:Router , private toastr : ToastrService) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]]
    } );
  }
  onRegister(){
    this.loading=true
    this.authSerice.registerUser(this.user).subscribe({
      next:(res)=>{
        this. authSerice.setRegistredUser(this.user);
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.loading=false
        this.router.navigate(["/verifEmail"]);

        },
      error:(err:any)=>{
        if(err.status=400){
          this.err= err.error.message;
          this.loading=false
        }
      }
      }) 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-authentification',
  templateUrl: './user-authentification.component.html',
  styleUrls: ['./user-authentification.component.scss']
})
export class UserAuthentificationComponent implements OnInit {

  form = new FormGroup({
    mailProfesional: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[^@]+@[^\.]+\..+/)]),
    passwordUser: new FormControl('', Validators.required)
  });  

  constructor(readonly router : Router) { }

  ngOnInit() {
  }

  authentificationUser(){
    if((this.form.get("passwordUser").value == "00000") && (this.form.get("mailProfesional").value == "a@a.a"))
    {
      console.log("Cordonnees Collaborateur : ",this.form.value);
      this.router.navigate(['/user-basic-information']);   
      
    } else {
      alert("E-mail ou mot de passe incorrect");
    }
     
   }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {Device} from '../../model/DeviceModel';
import {User} from '../../model/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  userType:string="Client"
  constructor(private formBuilder:FormBuilder,private registerService:RegisterService,private router:Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm(){
    this.registerForm=this.formBuilder.group({
      username:[null, Validators.required,],
      password:[null,Validators.required],
      firstname:[null,Validators.required],
      lastname:[null,Validators.required],
      address:[null,Validators.required],

    })
  }
  register(){

    let newClient = new User(
      this.registerForm.get('username').value,
      this.registerForm.get('password').value,
      this.userType,
      this.registerForm.get('firstname').value,
      this.registerForm.get('lastname').value,
      new Date(),
      this.registerForm.get('address').value,

    );
    this.registerService.register(newClient).subscribe((res:any)=>{


      this.router.navigate(["/login"]);


    });


  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/register/succes";
  // baseURL:string="http://localhost:8080/register/success";
  constructor(private httpClient:HttpClient) { }
  register(user:User){

    return this.httpClient.post(this.baseURL,user);


  }
}

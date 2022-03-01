import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/login";
  //baseURL:string="http://localhost:8080/login";
  constructor(private httpClient:HttpClient) { }

  authenticate(username, password) {
    return this.httpClient.post<any>('https://backend-spring-demo-2021.herokuapp.com/authenticate',{username,password}).pipe(
      map(
        res => {
         // sessionStorage.setItem('username',username);
          let tokenStr= 'Bearer '+ res.token;
          sessionStorage.setItem('token', tokenStr);
          return res.token;
        }
      )

    );
  }

  login(username:string,password:string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.post(this.baseURL,{
      username:username,
      password:password
    }, {headers})
  }
}

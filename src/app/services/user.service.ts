import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/UserModel';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/user/"
  //baseURL:string="http://localhost:8080/user/"
  constructor(private httpClient:HttpClient) { }

  getAllUsers(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<User[]>(this.baseURL + "getAllUsers", {headers})
  }

  addUser(user: User) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.post<User>(this.baseURL + "addUser", user, {headers});
  }

  updateUser(user: User):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.put(this.baseURL + "update/" + user.id, user, {headers});
  }

  deleteUser(id:string):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.delete(this.baseURL + "delete/" + id, {headers})
  }




}

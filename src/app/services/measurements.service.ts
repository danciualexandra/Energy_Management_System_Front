import { Injectable } from '@angular/core';
import {Device} from '../model/DeviceModel';
import {Observable, Timestamp} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Measurement} from '../model/Measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {
  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/measurement/"
  //baseURL:string="http://localhost:8080/measurement/"
  constructor(private httpClient:HttpClient) { }

  getAllMeasurements(userId: string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<Measurement[]>(this.baseURL + "all/" + userId, {headers})
  }

  filtersMeasurements(userId: string, timestamp:any):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.put(this.baseURL + "all/filter/" + userId, timestamp, {headers});
  }
}

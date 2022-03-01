import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Device} from '../model/DeviceModel';
import {Observable} from 'rxjs';
import {Sensor} from '../model/SensorModel';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/sensor/all"
  sensorURL:string="https://backend-spring-demo-2021.herokuapp.com/sensor/"
  //baseURL:string="http://localhost:8080/sensor/all"
  //sensorURL:string="http://localhost:8080/sensor/"
  constructor(private httpClient:HttpClient) { }

  getAllSensors(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<Sensor[]>(this.baseURL, {headers})
  }
  addSensor(sensor:Sensor){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.post<String>(this.sensorURL + "addSensor", sensor, {headers});
  }
  deleteSensor(id:string):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.delete(this.sensorURL + "delete/" + id, {headers})
  }
  updateSensor(sensor: Sensor):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.put(this.sensorURL + "update/" + sensor.id, sensor, {headers});
  }
  getAllSensorById(id:string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<Sensor[]>(this.baseURL+"/"+id, {headers});

  }
}

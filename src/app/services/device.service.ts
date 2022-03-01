import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/UserModel';
import {Device} from '../model/DeviceModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseURL:string="https://backend-spring-demo-2021.herokuapp.com/device/all"
  deviceURL:string="https://backend-spring-demo-2021.herokuapp.com/device/"
  //baseURL:string="http://localhost:8080/device/all"
  //deviceURL:string="http://localhost:8080/device/"
  constructor(private httpClient:HttpClient) { }


  getAllDevices(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<Device[]>(this.baseURL, {headers})
  }
  addDevice(device:Device){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.post<String>(this.deviceURL + "add", device, {headers});
  }
  deleteDevice(id:string):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.delete(this.deviceURL + "delete/" + id, {headers})
  }
  updateDevice(device: Device):Observable<Object>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.put(this.deviceURL + "update/" + device.id, device, {headers});
  }


  getAllDeviceById(id:string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token});
    return this.httpClient.get<Device[]>(this.baseURL+"/"+id, {headers});

  }
}

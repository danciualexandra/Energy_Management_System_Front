import {Device} from './DeviceModel';

export class User{
  id:string;
  username:string;
  password:string;
  type:string;
  firstname:string;
  lastname:string;
  birthDate: Date;
  address:string;
  deviceList:Device[];
  constructor(username:string,password:string,type:string,firstname:string,lastname:string,birthDate:Date,address:string) {
    this.username=username;
    this.password=password;
    this.type=type;
    this.firstname=firstname;
    this.lastname=lastname;
    this.birthDate=birthDate;
    this.address=address;
  }
}

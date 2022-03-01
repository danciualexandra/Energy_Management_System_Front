import {Component, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/UserModel';
import {UserService} from '../../services/user.service';
import {Device} from '../../model/DeviceModel';
import {DeviceService} from '../../services/device.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UpdateClientDialog} from './update-client-dialog';
import {UpdateDeviceDialog} from './update-device-dialog';
import {Sensor} from '../../model/SensorModel';
import {SensorService} from '../../services/sensor.service';
import {UpdateSensorDialog} from './update-sensor-dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  clientEvent: boolean = false;
  deviceEvent: boolean = false;
  addClientEvent: boolean = false;
  addDeviceEvent: boolean = false;
  sensorEvent: boolean = false;
  clientList: User[] = [];
  deviceList: Device[] = [];
  sensorList: Sensor[] = [];
  clientForm: FormGroup;
  deviceForm: FormGroup;
  userType: string;
  selectedUser: User;

  //[(value)]="selectedUser"


  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'birthDate', 'address', 'Actions', 'devices'];
  displayedColumnsDevice: string[] = ['description', 'location', 'maxEnergyConsumption', 'avgEnergyConsumption', 'Actions'];
  displayedColumnsSensor: string[] = ['sensorDescription','maxValue','deviceName','Actions'];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService,
              private deviceService: DeviceService, private clientBuilder: FormBuilder, public dialog: MatDialog,
              private deviceBuilder: FormBuilder,
              private sensorService: SensorService) {
  }

  ngOnInit(): void {


    this.userService.getAllUsers().subscribe((res) => {

        this.clientList = res;
        console.log(this.clientList[0].deviceList);
      },
      (_error) => {

      });
    this.deviceService.getAllDevices().subscribe((res) => {

        this.deviceList = res;
      },
      (_error) => {

      });
    this.sensorService.getAllSensors().subscribe((res) => {

        this.sensorList = res;
      },
      (_error) => {

      });


  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.clear();
  }

  onClickClientView() {
    this.clientEvent = true;
    this.deviceEvent = false;
    this.addClientEvent = false;
    this.addDeviceEvent = false;
    this.sensorEvent = false;

  }

  onClickDeviceView() {
    this.deviceEvent = true;
    this.clientEvent = false;
    this.addClientEvent = false;
    this.addDeviceEvent = false;
    this.sensorEvent = false;
  }

  onClickSensorView() {
    this.deviceEvent = false;
    this.clientEvent = false;
    this.addClientEvent = false;
    this.addDeviceEvent = false;
    this.sensorEvent = true;
  }


  onClickClientAdd() {
    this.deviceEvent = false;
    this.clientEvent = false;
    this.addClientEvent = true;
    this.addDeviceEvent = false;
    this.sensorEvent = false;
    this.initClientForm();
  }

  initClientForm() {
    this.clientForm = this.clientBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      address: [null, Validators.required]
    });
  }

  createClient() {
    let newUser = new User(
      this.clientForm.get('username').value,
      this.clientForm.get('password').value,
      this.userType,
      this.clientForm.get('firstname').value,
      this.clientForm.get('lastname').value,
      new Date(),
      this.clientForm.get('address').value
    );
    this.userService.addUser(newUser).subscribe((res) => {
      this.clientList.push(newUser);
    });
  }

  onChange(event) {
    this.userType = event.value;
  }

  openDialog(event): void {
    const dialogRef = this.dialog.open(UpdateClientDialog, {
      width: '250px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getAllUsers().subscribe((res) => {
        this.clientList = res;
      });
      console.log('The dialog was closed');
    });
  }

  deleteUser(event) {
    this.userService.deleteUser(event.id).subscribe((res) => {
      this.userService.getAllUsers().subscribe((res1) => {
        this.clientList = res1;
      });
    });
  }

  initDeviceForm() {
    this.deviceForm = this.deviceBuilder.group({
      description: [null, Validators.required],
      location: [null, Validators.required],
      avgEnergyConsumption: [null, Validators.required],
      maxEnergyConsumption: [null, Validators.required],
      selectedUser: [null, Validators.required],
      sensorDescription: [null, Validators.required],
      sensorMaxValue: [null, Validators.required]

    });

  }

  onClickDeviceAdd() {
    this.addDeviceEvent = true;
    this.deviceEvent = false;
    this.clientEvent = false;
    this.addClientEvent = false;
    this.sensorEvent = false;
    this.initDeviceForm();


  }


  createDevice() {

    let newDevice = new Device(
      this.deviceForm.get('description').value,
      this.deviceForm.get('location').value,
      this.deviceForm.get('avgEnergyConsumption').value,
      this.deviceForm.get('maxEnergyConsumption').value,
      this.selectedUser.id
    );
    let newSensor = new Sensor(
      this.deviceForm.get('sensorDescription').value,
      this.deviceForm.get('sensorMaxValue').value,
    );

    this.deviceService.addDevice(newDevice).subscribe((res: string) => {
      this.deviceList.push(newDevice);
      newSensor.deviceId = res;
      this.sensorService.addSensor(newSensor).subscribe((res) => {
        this.sensorList.push(newSensor);
      });
    });
  }

  deleteDevice(event) {
    this.deviceService.deleteDevice(event.id).subscribe((res) => {

      this.deviceService.getAllDevices().subscribe((res1) => {
        this.deviceList = res1;
      });
    });
  }

  openDeviceDialog(event): void {
    const dialogRef = this.dialog.open(UpdateDeviceDialog, {
      width: '250px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deviceService.getAllDevices().subscribe((res) => {
        this.deviceList = res;
      });
      console.log('The dialog was closed');
    });
  }

  getDeviceName(event: string){
    return this.deviceList.filter(device => device.id === event)[0].description;
  }

  deleteSensor(event) {
    this.sensorService.deleteSensor(event.id).subscribe((res) => {
      this.sensorService.getAllSensors().subscribe((res1) => {
        this.sensorList = res1;
      });
    });
  }

  openSensorDialog(event): void {
    const dialogRef = this.dialog.open(UpdateSensorDialog, {
      width: '250px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sensorService.getAllSensors().subscribe((res) => {
        this.sensorList = res;
      });
      console.log('The dialog was closed');
    });
  }
}

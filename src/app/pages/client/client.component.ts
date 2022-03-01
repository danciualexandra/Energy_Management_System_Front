import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Device} from '../../model/DeviceModel';
import {DeviceService} from '../../services/device.service';
import {SensorService} from '../../services/sensor.service';
import {Sensor} from '../../model/SensorModel';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MeasurementsService} from '../../services/measurements.service';
import {timestamp} from 'rxjs/operators';
import {Measurement} from '../../model/Measurement';
import * as Chart from 'chart.js';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  userId: string;
  deviceEvent: boolean = false;
  sensorEvent: boolean = false;
  consumptionEvent: boolean = false;
  measurementEvent:boolean=false;

  deviceList: Device[] = [];
  sensorList: Sensor[] = [];
  measurementList:Measurement[]=[];
  stompClient:any;

  displayedColumnsDevice: string[] = ['description', 'location', 'maxEnergyConsumption', 'avgEnergyConsumption'];
  displayedColumnsSensor: string[] = ['sensorDescription', 'maxValue', 'deviceName'];

  dateCalendar = new FormControl(new Date());
  displayedColumnsMeasurement: string[] =['Timestamp','Value','Sensor description'] ;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;




  constructor(private router: Router,
              private deviceService: DeviceService,
              private sensorService: SensorService,
              private measurementsService: MeasurementsService,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {


    this.userId = localStorage.getItem('id');
    this.subscribeToNotifications();
    this.deviceService.getAllDeviceById(this.userId).subscribe((res) => {

        this.deviceList = res;
      },
      (_error) => {

      });
    this.sensorService.getAllSensorById(this.userId).subscribe((res) => {

        this.sensorList = res;
      },
      (_error) => {

      });
    //B
    this.measurementsService.getAllMeasurements(this.userId).subscribe(res => {
      //console.log(res);
      this.measurementList=res;

    });



  }
  ngAfterViewInit(){

  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('id');
    sessionStorage.removeItem('token');
    localStorage.clear();
  }

  onClickDeviceView() {
    this.deviceEvent = true;
    this.sensorEvent = false;
    this.consumptionEvent = false;
    this.measurementEvent=false;
  }

  onClickSensorView() {
    this.sensorEvent = true;
    this.deviceEvent = false;
    this.consumptionEvent = false;
    this.measurementEvent=false;
  }

  onClickConsumptionView() {
    this.sensorEvent = false;
    this.deviceEvent = false;
    this.consumptionEvent = true;
    this.measurementEvent=false;
  }

  getDeviceName(event: string) {
    return this.deviceList.filter(device => device.id === event)[0].description;
  }

  updateDOB(event: MatDatepickerInputEvent<Date, any | null>) {
    let selected = event.value;
    this.measurementsService.filtersMeasurements(this.userId, selected).subscribe((res: Measurement[]) => {
      //C
     let map: Map<number, number> = new Map();
      res.forEach(function(value) {
        let utcHours = new Date(value.timestamp).getUTCHours();
        let val = value.value;
        if (map.has(utcHours)) {
         map.set(utcHours, map.get(utcHours) + val);
        } else {
          map.set(utcHours, val);
        }
      });
      console.log(map);

      //chart

      let keys = Array.from( map.keys() ); //orele
      let values=Array.from(map.values());


      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'horizontalBar',
        data: {
          datasets: [{
            label: 'Current value',

            data:keys,

            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
          },

          ],

          labels:values,

        },
      });






    });


  }

  onClickMeasurementView() {
    this.sensorEvent = false;
    this.deviceEvent = false;
    this.consumptionEvent = false;
    this.measurementEvent=true;
  }

  getSensorName(event: string) {

        return this.sensorList.filter(sensor => sensor.id=== event)[0].sensorDescription;

  }

  subscribeToNotifications(){
   const URL="https://backend-spring-demo-2021.herokuapp.com/socket";
   var websocket=new SockJS(URL);
   this.stompClient=Stomp.over(websocket);
   this.stompClient.connect({},()=>{
     this.stompClient.subscribe('/topic/socket/client/'+this.userId, notification=>{
       let message=notification.body;
       this.snackBar.open(message,'Close',{
         duration:3000
       })
     })
    });
  }
}

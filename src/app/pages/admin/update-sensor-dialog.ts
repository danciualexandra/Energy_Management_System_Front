import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../model/UserModel';
import {UserService} from '../../services/user.service';
import {SensorService} from '../../services/sensor.service';
import {Sensor} from '../../model/SensorModel';


@Component({
  selector: 'update-sensor-dialog',
  templateUrl: './update-sensor-dialog.html',
})
export class UpdateSensorDialog {


  constructor(
    public dialogRef: MatDialogRef<UpdateSensorDialog>,
    public sensorService: SensorService,
    @Inject(MAT_DIALOG_DATA) public data: Sensor) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSensor(): void {
    this.sensorService.updateSensor(this.data).subscribe((res) => {
      this.dialogRef.close();
    })
  }

}

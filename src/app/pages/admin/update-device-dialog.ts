import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../model/UserModel';
import {UserService} from '../../services/user.service';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../model/DeviceModel';


@Component({
  selector: 'update-device-dialog',
  templateUrl: './update-device-dialog.html',
})
export class UpdateDeviceDialog {


  constructor(
    public dialogRef: MatDialogRef<UpdateDeviceDialog>,
    public deviceService:DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: Device) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    this.deviceService.updateDevice(this.data).subscribe((res) => {
      this.dialogRef.close();
    })
  }

}

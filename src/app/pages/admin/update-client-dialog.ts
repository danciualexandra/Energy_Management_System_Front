import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../model/UserModel';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'update-client-dialog',
  templateUrl: './update-client-dialog.html',
})
export class UpdateClientDialog {
  public types = ['Administrator', 'Client']

  constructor(
    public dialogRef: MatDialogRef<UpdateClientDialog>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    this.userService.updateUser(this.data).subscribe((res) => {
      this.dialogRef.close();
    })
  }

}

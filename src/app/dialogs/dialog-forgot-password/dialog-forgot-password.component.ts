import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/common/global-constants';

import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  public email = "";

  constructor(private dialogRef: MatDialogRef<DialogForgotPasswordComponent>, private dialog: MatDialog, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public forgotPassword() {
    this.http.post<any>(this.servicesUrl + 'RecoverPassword.php', {'email': this.email}).subscribe(
      sucess => {
        if (sucess['status'] == 1) {
          this.toastr.success(sucess['message']);
          this.dialogRef.close();
          this.dialog.open(DialogLoginComponent, {width: '350px'});

        } else {
          this.toastr.error(sucess['message']);
        }

      }, 
      error => {
        console.log(error);
      }
    )
  }

}

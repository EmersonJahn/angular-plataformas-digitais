import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  email = "";

  constructor(private dialogRef: MatDialogRef<DialogForgotPasswordComponent>, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public forgotpw() {
    if (this.email == "eajahn@ucs.br"){
      this.toastr.success("E-mail para redefinir a senha foi enviado");
      this.dialogRef.close();
      this.dialog.open(DialogLoginComponent, {width: '350px'})
    } else {
      this.toastr.error("E-mail inválido")
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  email = "";

  constructor(private dialogRef: MatDialogRef<DialogForgotPasswordComponent>, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public forgotpw() {
    if (this.email == "eajahn@ucs.br"){
      this.toastr.success("E-mail para redefinir a senha foi enviado");
      this.dialogRef.close();
    } else {
      this.toastr.error("E-mail inválido")
    }
  }

}

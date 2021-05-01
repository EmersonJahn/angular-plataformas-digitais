import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  email    = "";
  password = "";

  constructor(public dialogRef: MatDialogRef<DialogLoginComponent>, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

    public openForgotPasswordDialog() {
    // TODO abrir dialog esqueceu senha
    this.dialogRef.close();
  }

  public login() {
    if (this.email == "eajahn@ucs.br" && this.password == "senha") { // TODO mudar para validar no banco de dados
      this.dialogRef.close();
    } else {
      this.toastr.error("E-mail ou senha inválido.");
          }
  }

  public cancel() {
    this.dialogRef.close();
  }

}

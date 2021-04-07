import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpComponent>) { }

  email    = "";
  password = "";

  ngOnInit(): void {
  }

  public openForgotPasswordDialog() {
    // TODO abrir dialog esqueceu senha
    this.dialogRef.close();
  }

  public login() {
    if (this.email == "eajahn@ucs.br" && this.password == "senha") { // TODO mudar para validar no banco de dados
      return true;
    } else {
      return false;
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}

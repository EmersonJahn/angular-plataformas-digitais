import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css', '../../app.component.css']
})
export class DialogLoginComponent implements OnInit {

  email    = "";
  password = "";

  constructor(private dialogRef: MatDialogRef<DialogLoginComponent>, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public openForgotPasswordDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogForgotPasswordComponent, {width: '350px'})
  }

  public login() {
    if (this.email == "eajahn@ucs.br" && this.password == "senha") { // TODO mudar para validar no banco de dados
      localStorage.setItem("userId", "1")
      localStorage.setItem("profilePhoto", "https://avatars.githubusercontent.com/u/68763696?v=4")
      window.location.reload();
      this.toastr.success("Login realizado com sucesso");
      this.dialogRef.close();
      return true;
    } else {
        this.toastr.error("E-mail ou senha inválido.");
        return false;
    }
  }

  // public cancel() {
  //   this.dialogRef.close();
  // }

  public signUp() {
    this.dialogRef.close();
  }

}

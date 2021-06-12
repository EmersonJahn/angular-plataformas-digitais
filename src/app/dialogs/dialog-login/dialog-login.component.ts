import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/common/global-constants';

import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css', '../../app.component.css']
})
export class DialogLoginComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  public email    = "";
  public password = "";

  public isValidEmail    = true;
  public isValidPassword = true;

  constructor(private dialogRef: MatDialogRef<DialogLoginComponent>, private dialog: MatDialog, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public openForgotPasswordDialog() {
    this.dialogRef.close();
    this.dialog.open(DialogForgotPasswordComponent, {width: '350px'})
  }

  public login() {
    // if (this.email == "eajahn@ucs.br" && this.password == "senha") { // TODO mudar para validar no banco de dados
    //   localStorage.setItem("userId", "1")
    //   localStorage.setItem("profilePhoto", "https://avatars.githubusercontent.com/u/68763696?v=4")
    //   window.location.reload();
    //   this.toastr.success("Login realizado com sucesso");
    //   this.dialogRef.close();
    //   return true;
      
    // } else {
    //     this.toastr.error("E-mail ou senha inválido.");
    //     return false;
    // }

    if (this.email.trim().length > 0) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }

    if (this.password.trim().length > 0) {
      this.isValidPassword = true;
    } else {
      this.isValidPassword = false;
    }

    if (!this.isValidEmail || !this.isValidPassword) {
      this.toastr.error("Todos os campos devem ser preenchidos.");
      return;
    }

    const body = {
      "email": this.email,
      "password": this.password
    };

    this.http.post<any>(this.servicesUrl + 'Login.php', body).subscribe(
      sucess => {
        console.log(sucess);
        
        if (sucess['status'] == 1) {
          this.toastr.success(sucess['message']);

          localStorage.setItem('userId', sucess['person']['id']);
          localStorage.setItem('profilePhoto', sucess['person']['profile_photo']);
          window.location.reload();
          this.dialogRef.close();

          return true;
          
        } else {
          this.toastr.error(sucess['message']);
          return false;
        }

      }, 
      error => {
        this.toastr.error('Ocorreu um erro desconhecido ao validar o login.');
        console.log(error);

        return false;
      }
    )

    return false;
  }

  public signUp() {
    this.dialogRef.close();
  }

  // public cancel() {
  //   this.dialogRef.close();
  // }

}

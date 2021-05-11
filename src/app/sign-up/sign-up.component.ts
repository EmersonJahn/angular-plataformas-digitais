import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../app.component.css']
})
export class SignUpComponent implements OnInit {

  public userId       = localStorage.getItem("userId");
  public profilePhoto = localStorage.getItem("profilePhoto");

  public newProfilePhoto: File|null = null;

  public personType      = 0;
  public name            = "";
  public cpf             = "";
  public cnpj            = "";
  public email           = "";
  public password        = "";
  public passwordConfirm = "";

  // public validPersonType     = true;
  public validName           = true;
  public validCpfCnpj        = true;
  public validEmail          = true;
  public validPassword       = true;
  public validPasswordConfim = true;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.userId) {
      // TODO chamar função para buscar dados do usuário no banco
    }
  }

  public signUp() {
    if (this.name.length > 0) {
      this.validName = true;
    } else {
      this.validName = false;
    }

    if (this.cpf.length > 0 || this.cnpj.length > 0) {
      this.validCpfCnpj = true;
    } else {
      this.validCpfCnpj = false;
    }

    if (this.email.length > 0) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }

    if (this.password.length > 0) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }

    if (this.passwordConfirm.length > 0) {
      this.validPasswordConfim = true;
    } else {
      this.validPasswordConfim = false;
    }

    if (!this.validName || !this.validCpfCnpj || !this.validEmail || !this.validPassword || !this.validPasswordConfim) {
      this.toastr.error("Todos os campos devem ser preenchidos.");
      return;
    }

    if (this.password.trim() != this.passwordConfirm.trim()) {
      this.validPassword       = false;
      this.validPasswordConfim = false;
      this.toastr.error("Senhas não coincidem.")
      return;
    }

    // TODO salvar no banco de dados (todos os dados mais foto de perfil)

  }

  public onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newProfilePhoto = input.files[0];
      // this.updateProfilePhoto(); // TODO salvar foto fisicamente em algum lugar 
    }    
  }
  
}

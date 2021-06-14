import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../app.service';
import { Person } from '../classes/Person';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../app.component.css']
})
export class SignUpComponent implements OnInit {

  public userId       = Number(localStorage.getItem("userId"));
  public profilePhoto = localStorage.getItem("profilePhoto");

  public newProfilePhoto: File|null = null;

  public personType:Number = 0;
  public name              = "";
  public cpf               = "";
  public cnpj              = "";
  public email             = "";
  public password          = "";
  public passwordConfirm   = "";

  // public validPersonType     = true;
  public isValidName           = true;
  public isValidCpfCnpj        = true;
  public isValidEmail          = true;
  public isValidPassword       = true;
  public isValidPasswordConfim = true;

  constructor(private appService: AppService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getPerson();
  }

  public signUp() {
    if (this.name.trim().length > 0) {
      this.isValidName = true;
    } else {
      this.isValidName = false;
    }

    if (this.cpf.trim().length > 0 || this.cnpj.trim().length > 0) {
      this.isValidCpfCnpj = true;
    } else {
      this.isValidCpfCnpj = false;
    }

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

    if (this.passwordConfirm.trim().length > 0) {
      this.isValidPasswordConfim = true;
    } else {
      this.isValidPasswordConfim = false;
    }

    if (!this.isValidName || !this.isValidCpfCnpj || !this.isValidEmail || !this.isValidPassword || !this.isValidPasswordConfim) {
      this.toastr.error("Todos os campos devem ser preenchidos.");
      return;
    }

    if (this.password.trim() != this.passwordConfirm.trim()) {
      this.isValidPassword       = false;
      this.isValidPasswordConfim = false;
      this.toastr.error("Senhas não coincidem.")
      return;
    }

    const personId = this.userId ? Number(this.userId) : 0
    // const personProfilePhoto = this.newProfilePhoto ? this.newProfilePhoto : this.profilePhoto ? this.profilePhoto : []

    // TODO ver com o Donelli como armazenar a foto
    // const person = new Person(personId, this.personType, this.name, this.cpf, this.cnpj, this.email, this.password, personProfilePhoto);

    // TODO salvar no banco de dados (todos os dados mais foto de perfil)

  }

  public onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newProfilePhoto = input.files[0];
      // this.updateProfilePhoto(); // TODO salvar foto fisicamente em algum lugar 
    }    
  }

  private getPerson() {
    if (this.userId) {
      this.appService.getPersonById(Number(this.userId)).then(person => {
        // console.log(person);
        this.personType = person['person_type_id'];
        this.name       = person['name'];
        this.cpf        = person['cpf'];
        this.cnpj       = person['cnpj'];
        this.email      = person['email'];
      })
    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

import { Category } from 'src/app/classes/Category';

@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css']
})
export class ProjectRegistrationComponent implements OnInit {

  public userId = localStorage.getItem("userId");

  public newProfilePhoto: File|null = null;

  public title       = "";
  public description = "";
  public category?: Category;
  
  public categories: Category[] = [];

  public isValidTitle       = true;
  public isValidDescription = true;
  public isValidCategory    = true;

  constructor(private appService: AppService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public projectRegistration() {
    if (!this.appService.validLogin()) {
      return;
    } 

    if (this.title.trim().length > 0) {
      this.isValidTitle = true;
    } else {
      this.isValidTitle = false;
    }

    if (this.description.trim().length > 0) {
      this.isValidDescription = true;
    } else {
      this.isValidDescription = false;
    }

    if (this.category && this.category.id > 0) {
      this.isValidCategory = true;
    } else {
      this.isValidCategory = false;
    }

    if (!this.isValidTitle || !this.isValidDescription || !this.isValidCategory) {
      this.toastr.error("Todos os campos devem ser preenchidos.");
      return;
    }

    // TODO salvar no banco de dados.
    this.toastr.success("Projeto criado com sucesso!");
  }

  public onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newProfilePhoto = input.files[0];
      console.log(this.newProfilePhoto);
      // this.updateProfilePhoto(); // TODO salvar foto fisicamente em algum lugar 
    }    
  }

  private getCategories() {
    this.categories = this.appService.getCategories();
  }


}

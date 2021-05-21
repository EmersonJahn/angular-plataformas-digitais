import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

import { Category } from 'src/app/classes/Category';

@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css']
})
export class ProjectRegistrationComponent implements OnInit {

  public title       = "";
  public description = "";
  public category: any;
  
  public categories: Category[] = [];

  public isValidTitle       = true;
  public isValidDescription = true;
  public isValidCategory    = true;

  constructor(private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public projectRegistration() {
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

  private getCategories() {
    this.categories = this.appService.getCategories();
  }


}

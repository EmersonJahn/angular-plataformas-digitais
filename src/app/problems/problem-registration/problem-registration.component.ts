import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Category } from 'src/app/classes/Category';

@Component({
  selector: 'app-problem-registration',
  templateUrl: './problem-registration.component.html',
  styleUrls: ['./problem-registration.component.css']
})
export class ProblemRegistrationComponent implements OnInit {

  public title       = "";
  public description = "";
  public category?: Category;
  
  public categories: Category[] = [];

  public isValidTitle       = true;
  public isValidDescription = true;
  public isValidCategory    = true;

  // public dropdownSettings = {};

  constructor(private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.setDropdownSettings();
    this.getCategories();
  }

  public problemRegistration() {   
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
    this.toastr.success("Problema criado com sucesso!");

  }

  // private setDropdownSettings() {
  //   this.dropdownSettings = {
  //     singleSelection: true,
  //     idField: 'id',
  //     textField: 'description',
  //     allowSearchFilter: true,
  //     searchPlaceholderText: 'BUSCAR',
  //     noDataAvailablePlaceholderText: "ERRO AO CARREGAR AS CATEGORIAS",
  //   };
  // }

  private getCategories() {
    this.appService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

}

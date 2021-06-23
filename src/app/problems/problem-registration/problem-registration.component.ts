import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from 'src/app/common/global-constants';
import { AppService } from 'src/app/app.service';

import { Category } from 'src/app/classes/Category';
import { Problem } from 'src/app/classes/Problem';
import { Person } from 'src/app/classes/Person';

@Component({
  selector: 'app-problem-registration',
  templateUrl: './problem-registration.component.html',
  styleUrls: ['./problem-registration.component.css']
})
export class ProblemRegistrationComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  public userId = Number(localStorage.getItem("userId"));

  public title       = "";
  public description = "";
  public category?: Category;
  
  public categories: Category[] = [];

  public isValidTitle       = true;
  public isValidDescription = true;
  public isValidCategory    = true;
  public disabled           = false;

  constructor(private appService: AppService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
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

    // const categoryId = this.category ? this.category.id : 0;
    if (this.category) {
      const person     = new Person(this.userId);
      const problem    = new Problem(0, person, this.category, this.title, this.description, 1, 0);

      this.http.post<any>(this.servicesUrl + 'CreateProblem.php', {'problem': problem}).subscribe(
        sucess => {
          if (sucess["status"] == 1) {
            this.toastr.success(sucess["message"]);     
            this.disabled = true;     
          } else {
            this.toastr.error(sucess["message"]);          
          }
        }, 
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao tentar cadastrar o problema.");
          console.log(error);
        }
      )
    }

  }

  private getCategories() {
    this.appService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

}

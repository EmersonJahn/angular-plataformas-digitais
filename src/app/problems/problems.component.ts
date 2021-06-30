import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from '../common/global-constants';
import { AppService } from '../app.service';
import { Category } from '../classes/Category';
import { Problem } from '../classes/Problem';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css', '../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemsComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  public userId = localStorage.getItem("userId");

  public searchBy = "";
  public categoryId = 0; 

  public categories: Category[] = [];
  public problems: Problem[]    = [];

  constructor(private appService: AppService, private toastr: ToastrService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProblems();

    // localStorage.setItem("selectedProblemId", "0");
  }

  public getProblems() {
    this.problems = [];

    const body = {
      "search_by": this.searchBy.trim(),
      "category_id": this.categoryId
    }

    this.http.post<any>(this.servicesUrl + 'GetProblems.php', body).subscribe(
      success => {
        if (success['status'] == 1) {
          this.problems = success['problems'];  
        } else {
          this.toastr.error(success['message']);
        }
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os problemas.");
        console.log(error);
      }
    )
  }

  public openNewProblem() {
    if (!this.appService.validLogin()) {
      return;
    }
    this.router.navigateByUrl('problems/registration');
  }

  public selectProblem(problem: Problem) {
    if (!this.appService.validLogin()) {
      return;
    }
    this.router.navigateByUrl('problems/visualization/' + problem.id);
  }

  // public getCategoryDescription(categoryId: Number) {
  //   let categoryDescription = "";
  //   const index = this.categories.findIndex(i => i.id == categoryId);
  //   if (index > -1) {
  //     categoryDescription = this.categories[index].description;
  //   }
  //   return categoryDescription;
  // }

  private getCategories() {
    this.appService.getCategories().then(categories => {
      this.categories = categories;
      this.categories.push(new Category(0, "Todas"));
    });
  }

}

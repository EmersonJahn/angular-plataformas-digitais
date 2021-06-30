import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from '../common/global-constants';
import { AppService } from '../app.service';
import { Category } from '../classes/Category';
import { Project } from '../classes/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;
  
  public userId = localStorage.getItem("userId");

  public searchBy   = "";
  public categoryId = 0; 

  public categories: Category[] = [];
  public projects: Project[] = [];

  constructor(private appService: AppService, private router: Router, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
  }

  public getProjects() {
    this.projects = [];

    const body = {
      "search_by": this.searchBy.trim(),
      "category_id": this.categoryId
    }
    
    this.http.post<any>(this.servicesUrl + 'GetProjects.php', body).subscribe(
      success => {
        if (success['status'] == 1) {
          this.projects = success['projects'];  
        } else {
          this.toastr.error(success['message']);
        }
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os projetos.");
        console.log(error);
      }
    )
  }

  public openNewProject() {
    if (!this.appService.validLogin()) {
      return;
    }
    this.router.navigateByUrl('projects/registration');
  }

  public selectProject(project: Project) {
    if (!this.appService.validLogin()) {
      return;
    }
    this.router.navigateByUrl('projects/visualization/' + project.id);
  }

  private getCategories() {
    this.appService.getCategories().then(categories => {
      this.categories = categories;
      this.categories.push(new Category(0, "Todas"));
    });
  }

}

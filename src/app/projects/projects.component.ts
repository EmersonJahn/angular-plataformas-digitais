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

  private servicesUrl   = GlobalConstants.servicesUrl;
  public  loadingConfig = GlobalConstants.loadingConfig;
  
  public userId = localStorage.getItem("userId");

  public searchBy   = "";
  public categoryId = 0; 

  public categories: Category[] = [];
  public projects: Project[] = [];

  public loading = false;

  constructor(private appService: AppService, private router: Router, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
  }

  public getProjects() {
    this.projects = [];

    this.loading = true;

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

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os projetos.");
        console.log(error);
        this.loading = false;
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

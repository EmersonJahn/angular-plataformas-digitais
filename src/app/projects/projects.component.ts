import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Category } from '../classes/Category';
import { Project } from '../classes/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit {

  public userId = localStorage.getItem("userId");

  public searchBy = "";
  public category = 0; 

  public categories: Category[] = [];
  public projects: Project[] = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
  }

  public getProjects() {
    this.projects = [];
    for (let index = 1; index < 7; index++) {
      const project = new Project(index, index, "Projeto - " + index, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis exercitationem velit earum voluptates nobis, nam aut voluptatibus. Tempore pariatur repellat sit ipsam, ducimus est nemo obcaecati vel voluptatem aspernatur. Iusto!", "assets/images/project-icon.png"); 
      this.projects.push(project);
    }
    // TODO validar filtros
    // TODO buscar no banco
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
    console.log("aqui");
    this.router.navigateByUrl('projects/visualization/' + project.id);
  }

  private getCategories() {
    this.categories = this.appService.getCategories();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

import { Category } from 'src/app/classes/Category';
import { Project } from 'src/app/classes/Project';
import { ProjectMember } from './../../classes/ProjectMember';

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  public selectedProjectId = 0;
  
  // public title       = "";
  // public description = "";
  // public category?: Category;
  public project?: Project;

  public projectMembers: ProjectMember[] = [];
  public categories: Category[] = [];

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("aqui: " + this.selectedProjectId);
    this.getProject();
  }

  private getProject() {
    // TODO buscar no banco
    this.project = new Project(this.selectedProjectId, this.selectedProjectId, "Projeto - " + this.selectedProjectId, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, dolore, nesciunt nihil magnam esse vitae explicabo similique earum praesentium iure excepturi commodi itaque quia in accusamus natus dolorem quam debitis.", "assets/images/project-icon.png");
    this.getProjectMembers();
    this.getCategories();
  }

  private getProjectMembers() {
    // TODO buscar no banco
    const projectMember  = new ProjectMember(this.selectedProjectId, 1, true);
    const projectMember2 = new ProjectMember(this.selectedProjectId, 2, false);
    const projectMember3 = new ProjectMember(this.selectedProjectId, 3, false);
    this.projectMembers.push(projectMember);
    this.projectMembers.push(projectMember2);
    this.projectMembers.push(projectMember3);
  }

  private getCategories() {
    this.categories = this.appService.getCategories();
  }

}

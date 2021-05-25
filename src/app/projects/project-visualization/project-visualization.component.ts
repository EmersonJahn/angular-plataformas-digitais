import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/classes/Project';

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  public selectedProjectId = 0;

  // public project: Project;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("aqui: " + this.selectedProjectId);
    this.getProject();
  }

  private getProject() {
    // this.project = new Project(this.selectedProjectId, this.selectedProjectId, "Projeto - " + this.selectedProjectId, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, dolore, nesciunt nihil magnam esse vitae explicabo similique earum praesentium iure excepturi commodi itaque quia in accusamus natus dolorem quam debitis.", "assets/images/project-icon.png");
  }

}

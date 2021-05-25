import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  public selectedProjectId = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
  }

}

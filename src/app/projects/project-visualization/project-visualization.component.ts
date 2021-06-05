import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

import { faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Category } from 'src/app/classes/Category';
import { Project } from 'src/app/classes/Project';
import { ProjectMember } from './../../classes/ProjectMember';

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css', '../../app.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  public faTrashAlt = faTrashAlt;
  public faUserPlus = faUserPlus;

  public selectedProjectId = 0;
  public userId = Number(localStorage.getItem("userId"));

  public newProfilePhoto: File|null = null;
  
  public memberPresentation = "";
  public project?: Project;
  public pendingMembersCount = 3; // TODO buscar valor correto

  public projectMembers: ProjectMember[] = [];
  public categories: Category[] = [];

  public isProjectOwner    = false;
  public isProjectMember   = false;
  public askToJoinOpened   = false;
  public askToJoinDisabled = false;

  constructor(private appService: AppService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategories();
    this.defineIsProjectOwner();
    this.defineIsProjectMember();
    this.getProject();
  }
  
  private getProject() {
    // TODO buscar no banco
    this.project = new Project(this.selectedProjectId, this.selectedProjectId, "Projeto - " + this.selectedProjectId, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, dolore, nesciunt nihil magnam esse vitae explicabo similique earum praesentium iure excepturi commodi itaque quia in accusamus natus dolorem quam debitis.", "assets/images/project-icon.png");
    this.getProjectMembers();
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

  public updateProject() {
    // TODO salvar informacoes no banco
    // TODO salvar tbm novo array de membros (caso algum tenha sido deletado)
  }

  public removeProjectMember(personId: any) {
    // TODO deletar do array de membros
  }

  public addProjectMember(personId: any) {
    // TODO add na lista de aprovações pendentes (new PendingProjectMember)
    this.toastr.success("Solicitação para participar do projeto enviada com sucesso!");
    this.askToJoinDisabled = true;
  }

  public onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newProfilePhoto = input.files[0];
      console.log(this.newProfilePhoto);
      // this.updateProfilePhoto(); // TODO salvar foto fisicamente em algum lugar 
    }    
  }

  public openApprovalMembers() {
    this.router.navigateByUrl('projects/approval-members/' + this.selectedProjectId);
  }
  
  private defineIsProjectOwner() {
    if (this.userId == this.selectedProjectId) { // TODO criar função que valide de verdade
      this.isProjectOwner = true;
    }
  }

  private defineIsProjectMember() {
    if (this.userId + 1 == this.selectedProjectId) { // TODO criar função que valide de verdade
      this.isProjectMember = true;
    }
  }

  private getCategories() {
    this.categories = this.appService.getCategories();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from 'src/app/common/global-constants';
import { AppService } from 'src/app/app.service';
import { Category } from 'src/app/classes/Category';
import { Project } from 'src/app/classes/Project';
import { ProjectMember } from 'src/app/classes/ProjectMember';
import { Person } from 'src/app/classes/Person';
import { PendingProjectMember } from 'src/app/classes/PendingProjectMember';
import { ProjectStatus } from 'src/app/classes/ProjectStatus';

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css', '../../app.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  private servicesUrl   = GlobalConstants.servicesUrl;
  public  loadingConfig = GlobalConstants.loadingConfig;

  public selectedProjectId = 0;
  public userId = Number(localStorage.getItem("userId"));

  public faTrashAlt = faTrashAlt;
  public faUserPlus = faUserPlus;

  public newProfilePhoto: File|null = null;
  
  public memberPresentation = "";
  public project?: Project;
  public pendingMembersCount = 0;

  public projectMembers: ProjectMember[] = [];
  public categories: Category[] = [];
  public projectStatus: ProjectStatus[] = [];
  private projectMembersRemoved: ProjectMember[] = [];

  public isProjectOwner    = false;
  public isProjectMember   = false;
  public askToJoinOpened   = false;
  public askToJoinDisabled = false;
  public loading           = false;

  constructor(private appService: AppService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategories();
    this.getProjectStatus();
    this.getProject();
  }
  
  private getProject() {
    this.loading = true;

    this.http.post<any>(this.servicesUrl + 'GetProjectById.php', {'project_id': this.selectedProjectId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.project = success['project'];

          if (this.project) {
            this.getProjectMembers();
            this.defineIsProjectOwner();
          }

        } else {
          this.toastr.error(success['message']);
          this.loading = false;
        }
        
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os dados do projeto.");
        console.log(error);
        this.loading = false;
      }
    )
  }

  private getProjectMembers() {
    this.loading = true;

    this.projectMembers = [];

    this.http.post<any>(this.servicesUrl + 'GetProjectMembersByProjectId.php', {"project_id": this.selectedProjectId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.projectMembers = success['project_members'];
          this.defineIsProjectMember();
        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os integrantes do projeto.");
        console.log(error);
        this.loading = false;
      }
    )
  }

  public updateProject() {
    this.loading = true;
    
    this.http.post<any>(this.servicesUrl + 'UpdateProject.php', {'project':this.project}).subscribe(
      success => {
        if (success['status'] == 1) {
          if (this.projectMembersRemoved.length > 0) {
            this.removeProjectMembers();
          }
          this.toastr.success(success['message']);

        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao salvar as informações do projeto.");
        console.log(error);
        this.loading = false;
      }
    )
  }

  private removeProjectMembers() {
    this.loading = true;

    this.http.post<any>(this.servicesUrl + 'RemoveProjectMembers.php', {'project_members': this.projectMembersRemoved}).subscribe(
      success => {
        if (success['status'] == 0) {
          this.toastr.error(success['message']);
        }
        this.loading = false;
      },
      error => {
        this.toastr.error('Ocorreu um erro desconhecido ao remover o(s) integrante(s) do projeto.');
        console.log(error);
        this.loading = false;
      }
    )
  }

  public removeProjectMemberFromList(personId: Number, removeProjectMembers: boolean) {
    const textConfirm = removeProjectMembers ? "Você tem certeza que deseja sair do projeto?" : "Você tem certeza que deseja remover esse integrante?";
    if (confirm(textConfirm)) {
      const index = this.projectMembers.findIndex(i => i.person.id == personId);

      if (index > -1) {
        this.projectMembers.splice(index, 1);

        const projetMemberRemoved = new ProjectMember(0, this.selectedProjectId, new Person(personId));
        this.projectMembersRemoved.push(projetMemberRemoved);
        if (removeProjectMembers) {
          this.removeProjectMembers();
          this.projectMembersRemoved.slice();
          window.location.reload();
        }
      }
    }
  }

  public addProjectMember(personId: any) {
    this.loading = true;
    
    const pendingProjectMember = new PendingProjectMember(0, this.selectedProjectId, new Person(personId), this.memberPresentation);

    this.http.post<any>(this.servicesUrl + 'CreatePendingProjectMember.php', {'pending_project_member': pendingProjectMember}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.toastr.success(success['message']);
        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao solicitar participação no projeto.");
        console.log(error);
        this.loading = false;
      }
    )

    this.askToJoinDisabled = true;
  }

  public onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    let reader = new FileReader();

    if (input.files) {
      reader.readAsDataURL(input.files[0]);
      reader.onload = (event) => {
        const photo = event.target!.result;
        if (typeof photo == 'string') {
          this.project!.project_photo = photo;
        }
      }
    }    
  }

  public openApprovalMembers() {
    this.router.navigateByUrl('projects/approval-members/' + this.selectedProjectId);
  }

  private getPendingMembersCount() {
    this.loading = true;

    this.pendingMembersCount = 0;

    this.http.post<any>(this.servicesUrl + 'GetPendingMembersCount.php', {"project_id": this.selectedProjectId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.pendingMembersCount = success['pending_members_count'];
        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar o número de solitações pendente.");
        console.log(error);
        this.loading = false;
      }
    )
  }
  
  private defineIsProjectOwner() {
    if (this.userId == this.project?.person.id) {    
      this.isProjectOwner = true;
      this.getPendingMembersCount();
    }
  }

  private defineIsProjectMember() {
    for (let index = 0; index < this.projectMembers.length; index++) {
      if (this.projectMembers[index].person.id == this.userId ) {
        this.isProjectMember = true;
        break;
      }
    }
  }

  private getCategories() {
    this.appService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

  private getProjectStatus() {
    this.appService.getProjectStatus().then(projectStatus => {
      this.projectStatus = projectStatus;
    });
  }

}

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

@Component({
  selector: 'app-project-visualization',
  templateUrl: './project-visualization.component.html',
  styleUrls: ['./project-visualization.component.css', '../../app.component.css']
})
export class ProjectVisualizationComponent implements OnInit {

  public faTrashAlt = faTrashAlt;
  public faUserPlus = faUserPlus;

  private servicesUrl = GlobalConstants.servicesUrl;

  public selectedProjectId = 0;
  public userId = Number(localStorage.getItem("userId"));

  public newProfilePhoto: File|null = null;
  
  public memberPresentation = "";
  public project?: Project;
  public pendingMembersCount = 3; // TODO buscar valor correto

  public projectMembers: ProjectMember[] = [];
  public categories: Category[] = [];

  public isProjectOwner       = false;
  public isProjectMember      = false;
  public askToJoinOpened      = false;
  public askToJoinDisabled    = false;
  public projectMemberRemoved = false;

  constructor(private appService: AppService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategories();
    this.getProject();
  }
  
  private getProject() {
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
        }

      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os dados do projeto.");
        console.log(error);
      }
    )
  }

  private getProjectMembers() {
    this.projectMembers = [];
    this.http.post<any>(this.servicesUrl + 'GetProjectMembersByProjectId.php', {"project_id": this.selectedProjectId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.projectMembers = success['projectMembers'];
          this.defineIsProjectMember();
        } else {
          this.toastr.error(success['message']);
        }

      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar os integrantes do projeto.");
        console.log(error);
      }
    )
  }

  public updateProject() {
    // TODO salvar informacoes no banco
    // TODO salvar tbm novo array de membros (caso algum tenha sido deletado)
  }

  public removeProjectMember(personId: Number) {
    if (confirm("Você tem certeza que deseja remover esse integrante?")) {
      const index = this.projectMembers.findIndex(i => i.person.id == personId);
      if (index > -1) {
        this.projectMembers.splice(index, 1);
        this.projectMemberRemoved = true;
      }
    }
  }

  public addProjectMember(personId: any) {
    // TODO add na lista de aprovações pendentes (new PendingProjectMember)
    this.toastr.success("Solicitação para participar do projeto enviada com sucesso!");
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
  
  private defineIsProjectOwner() {
    if (this.userId == this.project?.person.id) {
      this.isProjectOwner = true;
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

}

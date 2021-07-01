import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from 'src/app/common/global-constants';
import { PendingProjectMember } from 'src/app/classes/PendingProjectMember';

@Component({
  selector: 'app-approval-project-members',
  templateUrl: './approval-project-members.component.html',
  styleUrls: ['./approval-project-members.component.css', '../../app.component.css']
})
export class ApprovalProjectMembersComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  private selectedProjectId = 0;

  public faCheck = faCheck;
  public faTimes = faTimes;

  public pendingProjectMembers: PendingProjectMember[] = [];

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPendingProjectMembers();
  }

  private getPendingProjectMembers() {
    this.pendingProjectMembers = [];
    this.http.post<any>(this.servicesUrl + 'GetPendingProjectMembers.php', {'project_id':this.selectedProjectId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.pendingProjectMembers = success['pending_project_members'];
        } else {
          this.toastr.error(success['message']);
        }

      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar as solicitações para participar do projeto.");
        console.log(error);
      }
    )    
  }

  public approvalProjectMember(pendingProjectMember: PendingProjectMember, approved: boolean) {
    const textConfirm = approved ? "aprovar" : "rejeitar";

    if (confirm("Você tem certeza que deseja " + textConfirm + " essa solicitação?")) {
      const body = {
        'pending_project_member': pendingProjectMember,
        'approved': approved
      }
      this.http.post<any>(this.servicesUrl + 'ApprovalProjectMember.php', body).subscribe(
        success => {
          if (success['status'] == 1) {
            this.toastr.success(success['message']);
            this.getPendingProjectMembers();
          } else {
            this.toastr.error(success['message']);
          }
  
        },
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao " + textConfirm + " o integrante");
          console.log(error);
        }
      )
    }

    // setTimeout(() => {
    //   this.getPendingProjectMembers();
    // }, 200);
  }

}

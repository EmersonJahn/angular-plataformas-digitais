import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { PendingProjectMember } from 'src/app/classes/PendingProjectMember';

@Component({
  selector: 'app-approval-project-members',
  templateUrl: './approval-project-members.component.html',
  styleUrls: ['./approval-project-members.component.css', '../../app.component.css']
})
export class ApprovalProjectMembersComponent implements OnInit {

  private selectedProjectId = 0;

  public faCheck = faCheck;
  public faTimes = faTimes;

  public pendingProjectMembers: PendingProjectMember[] = [];

  constructor(private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPendingProjectMembers();
  }

  private getPendingProjectMembers() {
    this.pendingProjectMembers = [];
    for (let index = 1; index < 4; index++) {
      const pendingProjectMember = new PendingProjectMember(this.selectedProjectId, index, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nisi eligendi officiis labore, nihil qui voluptatum et nulla esse, voluptatem quae delectus debitis non nobis blanditiis obcaecati sapiente. Beatae, recusandae?");
      this.pendingProjectMembers.push(pendingProjectMember);
    }
  }

  public approvalProjectMember(pendingProjectMember: PendingProjectMember, approved: boolean) {
    const message = approved ? "aprovado" : "rejeitado";
    this.toastr.success("Integrante " + message + " com sucesso!");

    setTimeout(() => {
      this.getPendingProjectMembers();
    }, 200);
  }

}

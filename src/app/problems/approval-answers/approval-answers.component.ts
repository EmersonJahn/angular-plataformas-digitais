import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { PendingAnswer } from './../../classes/PendingAnswer';

@Component({
  selector: 'app-approval-answers',
  templateUrl: './approval-answers.component.html',
  styleUrls: ['./approval-answers.component.css', '../problems.component.css', '../../app.component.css']
})
export class ApprovalAnswersComponent implements OnInit {

  public faCheck = faCheck;
  public faTimes = faTimes;

  public pendingAnswers: PendingAnswer[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPendingAnswers();
  }

  public approvalAnswer(pendingAnswer: PendingAnswer, approved: boolean) {
    const message = approved ? "aprovada" : "rejeitada";
    this.toastr.success("Resposta " + message + " com sucesso!");

    setTimeout(() => {
      this.getPendingAnswers();
    }, 200);
  }

  private getPendingAnswers() {
    this.pendingAnswers = [];
    for (let index = 1; index < 6; index++) {
      const pendingAnswer =  new PendingAnswer(index, index);
      this.pendingAnswers.push(pendingAnswer); 
    }
  }

}

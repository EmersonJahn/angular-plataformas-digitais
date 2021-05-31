import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { PendingAnswer } from './../../classes/PendingAnswer';

@Component({
  selector: 'app-approval-answers',
  templateUrl: './approval-answers.component.html',
  styleUrls: ['./approval-answers.component.css', '../problems.component.css']
})
export class ApprovalAnswersComponent implements OnInit {

  public faCheck = faCheck;
  public faTimes = faTimes;

  public pendingAnswers: PendingAnswer[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getPendingAnswers();
  }

  private getPendingAnswers() {
    for (let index = 1; index < 6; index++) {
      const pendingAnswer =  new PendingAnswer(index, index);
      this.pendingAnswers.push(pendingAnswer); 
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from 'src/app/common/global-constants';
import { PendingAnswer } from './../../classes/PendingAnswer';

@Component({
  selector: 'app-approval-answers',
  templateUrl: './approval-answers.component.html',
  styleUrls: ['./approval-answers.component.css', '../problems.component.css', '../../app.component.css']
})
export class ApprovalAnswersComponent implements OnInit {

  private servicesUrl = GlobalConstants.servicesUrl;

  public faCheck = faCheck;
  public faTimes = faTimes;

  public pendingAnswers: PendingAnswer[] = [];

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getPendingAnswers();
  }

  private getPendingAnswers() {
    this.pendingAnswers = [];

    this.http.get<any>(this.servicesUrl + 'GetPendingAnswers.php').subscribe(
      success => {
        if (success['status'] == 1) {
          this.pendingAnswers = success['pending_answers'];
        } else {
          this.toastr.error(success['message']);
        }

      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar as solicitações de resposta.");
        console.log(error);
      }
    )

  }

  public approvalAnswer(pendingAnswer: PendingAnswer, approved: boolean) {
    const textConfirm = approved ? "aprovar" : "rejeitar";

    if (confirm("Você tem certeza que deseja " + textConfirm + " essa reposta?")) {
      const body = {
        'pending_answer': pendingAnswer,
        'approved': approved
      }
      
      this.http.post<any>(this.servicesUrl + 'ApprovalAnswer.php', body).subscribe(
        success => {
          if (success['status'] == 1) {
            this.toastr.success(success['message']);
            this.getPendingAnswers();
          } else {
            this.toastr.error(success['message']);
          }
  
        },
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao " + textConfirm + " a reposta.");
          console.log(error);
        }
      )
    }
  }

}

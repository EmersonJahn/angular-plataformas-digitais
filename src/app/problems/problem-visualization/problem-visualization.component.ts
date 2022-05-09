import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/app.service';
import { Answer } from 'src/app/classes/Answer';
import { Person } from 'src/app/classes/Person';
import { Problem } from 'src/app/classes/Problem';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-problem-visualization',
  templateUrl: './problem-visualization.component.html',
  styleUrls: ['./problem-visualization.component.css', '../../app.component.css', '../problems.component.css']
})
export class ProblemVisualizationComponent implements OnInit {

  public faCheck = faCheck;
  
  private servicesUrl   = GlobalConstants.servicesUrl;
  public  loadingConfig = GlobalConstants.loadingConfig;

  public userId = Number(localStorage.getItem("userId"));

  public selectedProblemId = 0;
  public answerOpened = false;

  public addAnswer = "";
  public disableAddAnswer = false;

  public problem?: Problem;
  public answers: Answer[] = [];

  public loading = false;

  constructor(private route: ActivatedRoute, private appService: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.appService.validLogin()) {
      this.router.navigateByUrl('problems');
    }
    this.selectedProblemId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProblem();
  }

  private getProblem() {
    this.loading = true;

    this.http.post<any>(this.servicesUrl + 'GetProblemById.php', {'problem_id': this.selectedProblemId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.problem = success['problem'];
          this.getAnswers();
        } else {
          this.toastr.error(success['message']);
          this.loading = false;
        }
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar o problema.");
        console.log(error);
        this.loading = false;
      }
    )
  }

  private getAnswers() {
    this.answers = [];

    this.loading = true;

    this.http.post<any>(this.servicesUrl + 'GetAnswersByProblemId.php', {'problem_id': this.selectedProblemId}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.answers = success['answers'];
        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        this.toastr.error("Ocorreu um erro desconhecido ao buscar as respostas.");
        console.log(error);
        this.loading = false;
      }
    )

  }

  public sendToReview() {
    this.loading = true;

    const person  = new Person(this.userId);
    const problem = new Problem(this.selectedProblemId, person);
    const answer  = new Answer(0, problem, person, this.addAnswer, 1, false);

    this.http.post<any>(this.servicesUrl + 'CreateAnswer.php', {'answer': answer}).subscribe(
      success => {
        if (success['status'] == 1) {
          this.toastr.success("Agradeçemos a contribuição.", "A sua resposta foi enviada para análise.");
          this.disableAddAnswer = true;
        } else {
          this.toastr.error(success['message']);
        }

        this.loading = false;
      },
      error => {
        console.log(error);
        this.toastr.error("Ocorreu um erro desconhecido ao tentar gravar a resposta.");
        this.loading = false;
      }
    )
  }


}

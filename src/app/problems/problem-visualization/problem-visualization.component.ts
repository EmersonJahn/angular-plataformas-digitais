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
  
  private servicesUrl = GlobalConstants.servicesUrl;

  public userId = Number(localStorage.getItem("userId"));

  // public selectedProblemId = Number(localStorage.getItem("selectedProblemId"));
  public selectedProblemId = 0;
  public answerOpened = false;

  public addAnswer = "";
  public disableAddAnswer = false;

  public problem?: Problem;
  public problemPerson?: Person;
  public answers: Answer[] = [];
  public answersPersons: Person[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.appService.validLogin()) {
      this.router.navigateByUrl('problems');
    }
    this.selectedProblemId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProblem();
  }

  private getProblem() {
    // TODO buscar problema do selectedProblemId

    this.problem = new Problem(this.selectedProblemId, this.selectedProblemId, this.selectedProblemId, "Título problema - " + this.selectedProblemId, "Descrição problema - " + this.selectedProblemId + ": Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur ratione vero laudantium quidem alias officiis recusandae! Error, assumenda soluta. Velit labore blanditiis necessitatibus voluptas, fugiat ex aspernatur vel architecto.", this.selectedProblemId, this.selectedProblemId);

    this.appService.getPersonById(this.problem.person_id).then(person => {
      this.problemPerson = person;
    })
    this.getAnswers();
  }

  private getAnswers() {
    // TODO buscar respostas do selectedProblemId

    const answer = new Answer(1, this.selectedProblemId, 2, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut voluptatum corporis itaque tempora adipisci accusantium pariatur quidem reprehenderit! Perferendis blanditiis cum asperiores accusantium necessitatibus earum voluptatibus, reiciendis voluptate veritatis nulla!", 2, false);
    this.answers.push(answer);

    this.appService.getPersonById(answer.person_id).then(person => {
      this.answersPersons.push(person);
    })
  }

  // private getPersonById(personId: Number) {
  //   // TODO buscar pessoas do personId

  //   if (personId == 1) {
  //     const person = new Person(1, 1, "Enzo Gabriel", "99999999999", "", "enzo@gmail.com", "123456", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
  //     this.persons.push(person);
  //   }
  //   if (personId == 2) {
  //     const person2 = new Person(2, 1, "Ana Valentina", "88888888888", "", "valentina@gmail.com", "654321", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
  //     this.persons.push(person2);
  //   }
  // }

  public sendToReview() {
    const answer = new Answer(0, this.selectedProblemId, this.userId, this.addAnswer, 1, false);

    this.http.post<any>(this.servicesUrl + 'CreateAnswer.php', {'answer': answer}).subscribe(
      sucess => {
        console.log(sucess);
        if (sucess['status'] == 1) {
          this.toastr.success("Agradeçemos a contribuição.", "A sua resposta foi enviada para análise.");
          this.disableAddAnswer = true;
        } else {
          this.toastr.error(sucess['message']);
        }
      },
      error => {
        console.log(error);
        this.toastr.error("Ocorreu um erro desconhecido ao tentar gravar a resposta.");
      }
    )
  }

  // private getPersonById(personId: Number) {
  //   this.appService.getPersonById(personId).then(person => {
  //     return person;
  //   })
  //   return undefined;
  // }

}

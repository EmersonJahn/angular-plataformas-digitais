import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Answer } from 'src/app/classes/Answer';
import { Person } from 'src/app/classes/Person';
import { Problem } from 'src/app/classes/Problem';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-problem-visualization',
  templateUrl: './problem-visualization.component.html',
  styleUrls: ['./problem-visualization.component.css', '../../app.component.css']
})
export class ProblemVisualizationComponent implements OnInit {

  public faCheck = faCheck;

  // public selectedProblemId = Number(localStorage.getItem("selectedProblemId"));
  public selectedProblemId = 0;

  public problem: any;
  public answers: Answer[] = [];
  public persons: Person[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedProblemId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProblem();
  }

  private getProblem() {
    // TODO buscar problema do selectedProblemId

    this.problem = new Problem(this.selectedProblemId, this.selectedProblemId, this.selectedProblemId, "Título problema - " + this.selectedProblemId, "Descrição problema - " + this.selectedProblemId + ": Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur ratione vero laudantium quidem alias officiis recusandae! Error, assumenda soluta. Velit labore blanditiis necessitatibus voluptas, fugiat ex aspernatur vel architecto.", this.selectedProblemId, this.selectedProblemId);
    this.getPersonById(this.problem.person_id);
    this.getAnswers();
  }

  private getAnswers() {
    // TODO buscar respostas do selectedProblemId

    const answer = new Answer(1, this.selectedProblemId, 2, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut voluptatum corporis itaque tempora adipisci accusantium pariatur quidem reprehenderit! Perferendis blanditiis cum asperiores accusantium necessitatibus earum voluptatibus, reiciendis voluptate veritatis nulla!", 2, false);
    this.answers.push(answer);

    this.getPersonById(answer.person_id);
  }

  private getPersonById(personId: Number) {
    // TODO buscar pessoas do personId

    if (personId == 1) {
      const person = new Person(1, 1, "Enzo Gabriel", "99999999999", "", "enzo@gmail.com", "123456", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
      this.persons.push(person);
    }
    if (personId == 2) {
      const person2 = new Person(2, 1, "Ana Valentina", "88888888888", "", "valentina@gmail.com", "654321", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
      this.persons.push(person2);
    }
  }

}

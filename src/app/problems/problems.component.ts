import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../app.service';
import { Category } from '../classes/Category';
import { Problem } from '../classes/Problem';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemsComponent implements OnInit {

  public category: any; 
  public categories: Category[] = [];
  public problems: Problem[]    = [];

  // public dropdownSettings = {};

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    // this.setDropdownSettings();
    this.getCategories();
    this.getProblems();

    localStorage.setItem("selectedProblemId", "0");
  }

  public getProblems() {
    this.problems = [];
    for (let index = 1; index < 6; index++) {
      const problem = new Problem(index, index, index, "Título problema - " + index, "Descrição problema - " + index + ": Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur ratione vero laudantium quidem alias officiis recusandae! Error, assumenda soluta. Velit labore blanditiis necessitatibus voluptas, fugiat ex aspernatur vel architecto.", index, index);
      this.problems.push(problem);
    }

    // TODO validar filtros
    // TODO buscar no banco
  }

  public selectProblem(problem: Problem) {
    localStorage.setItem("selectedProblemId", problem.id.toString());
  }

  // private setDropdownSettings() {
  //   this.dropdownSettings = {
  //     singleSelection: true,
  //     idField: 'id',
  //     textField: 'description',
  //     allowSearchFilter: true,
  //     searchPlaceholderText: 'BUSCAR',
  //     noDataAvailablePlaceholderText: "ERRO AO CARREGAR AS CATEGORIAS",
  //   };
  // }

  private getCategories() {
    this.categories = this.appService.getCategories();
  }

}

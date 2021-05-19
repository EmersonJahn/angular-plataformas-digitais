import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { Category } from '../classes/Category';
import { Problem } from '../classes/Problem';
import { DialogLoginComponent } from '../dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemsComponent implements OnInit {

  public userId = localStorage.getItem("userId");
  public category: any; 
  public categories: Category[] = [];
  public problems: Problem[]    = [];

  // public dropdownSettings = {};

  constructor(private appService: AppService, private dialog: MatDialog, private toastr: ToastrService, private router: Router) { }

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

  public openNewProblem() {
    if (!this.userId) {
      this.toastr.info("Para continuar você deve realizar o login.");

      const dialogRef = this.dialog.open(DialogLoginComponent, {width: '350px'})
      dialogRef.afterClosed().subscribe(result => {
        this.userId = localStorage.getItem("userId");
        this.router.navigateByUrl('problems/registration');
      })

    } else {
      this.router.navigateByUrl('problems/registration');
    }
  }

  public selectProblem(problem: Problem) {
    if (!this.userId) {
      this.toastr.info("Para continuar você deve realizar o login.");

      const dialogRef = this.dialog.open(DialogLoginComponent, {width: '350px'})
      dialogRef.afterClosed().subscribe(result => {
        this.userId = localStorage.getItem("userId");
        this.openSelectedProblem(problem);
        // localStorage.setItem("selectedProblemId", problem.id.toString());
      })

    } else {
      this.openSelectedProblem(problem);
      // localStorage.setItem("selectedProblemId", problem.id.toString());
    }

  }

  private openSelectedProblem(problem: Problem) {
    localStorage.setItem("selectedProblemId", problem.id.toString());
    this.router.navigateByUrl('problems/visualization');
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

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';
import { GlobalConstants } from './common/global-constants';

import { Category } from './classes/Category';
import { Person } from './classes/Person';
import { ProjectStatus } from './classes/ProjectStatus';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private servicesUrl = GlobalConstants.servicesUrl;

  constructor(private dialog: MatDialog, private toastr: ToastrService, private http: HttpClient) { }

  public getCategories(): Promise<Category[]> {
    return new Promise ((resolve, reject) => {
      this.http.get<any>(this.servicesUrl + 'GetCategories.php').subscribe(
        success => {
          if (success['status'] == 1) {
            resolve(success['categories']);
          } else {
            this.toastr.error("Ocorreu um erro desconhecido ao buscar as categorias");
          }
        }, 
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao buscar as categorias");
          console.log(error);
        }
      )
    })
  }

  public getProjectStatus(): Promise<ProjectStatus[]> {
    return new Promise ((resolve, reject) => {
      this.http.get<any>(this.servicesUrl + 'GetProjectStatus.php').subscribe(
        success => {
          if (success['status'] == 1) {
            resolve(success['project_status']);
          } else {
            this.toastr.error("Ocorreu um erro desconhecido ao buscar a situação do projeto.");
          }
        }, 
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao buscar a situação do projeto.");
          console.log(error);
        }
      )
    })
  }

  public getPersonById(personId: Number): Promise<Person> {
    return new Promise ((resolve, reject) => {
      this.http.post<any>(this.servicesUrl + 'GetPersonById.php', {"person_id": personId}).subscribe(
        success => {
          if (success['status'] == 1) {
            resolve(success['person']);
          }
        }, 
        error => {
          console.log(error);
        }
      )
    })
  }

  public validLogin(): boolean {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      this.toastr.info("Para continuar você deve realizar o login.");
      const dialogRef = this.dialog.open(DialogLoginComponent, { width: '350px' });

      dialogRef.afterClosed().subscribe(result => {
        userId = localStorage.getItem("userId");
        if (userId) {
          return true;
        } else {
          return false;
        }
      })
      return false;

    } else {
      return true;
    }
  }

}
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';
import { GlobalConstants } from './common/global-constants';

import { Category } from './classes/Category';
import { Person } from './classes/Person';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private person?: Person;

  private servicesUrl = GlobalConstants.servicesUrl;

  constructor(private dialog: MatDialog, private toastr: ToastrService, private http: HttpClient) { }

  public getCategories(): Promise<Category[]> {
    // console.log("1");
    // let categories: Category[] = [];
    // this.http.get<any>('http://10.2.1.2/emerson/faculdade/plataformas-digitais/php/services/GetCategories.php').subscribe(
    //   sucess => {
    //     console.log("2");
    //     if (sucess['status'] == 1) {
    //       categories = sucess['categories'];
    //       console.log(categories);
    //     }
    //   }, 
    //   error => {
    //     this.toastr.error("Ocorreu um erro ao buscar as categorias");
    //     console.log(error);
    //   }
    // )
    // console.log("3");

    // return categories;

    return new Promise ((resolve, reject) => {
      this.http.get<any>(this.servicesUrl + 'GetCategories.php').subscribe(
        sucess => {
          if (sucess['status'] == 1) {
            resolve(sucess['categories']);
          }
        }, 
        error => {
          this.toastr.error("Ocorreu um erro desconhecido ao buscar as categorias");
          console.log(error);
        }
      )
    })

  }

  public validLogin(): boolean {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      this.toastr.info("Para continuar você deve realizar o login.");

      const dialogRef = this.dialog.open(DialogLoginComponent, { width: '350px' })
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

  public getPersonById(personId: Number) {
    // TODO buscar no banco através do personId
    if (personId == 1) {
      this.person = new Person(1, 1, "Enzo Gabriel", "99999999999", "", "enzo@gmail.com", "123456", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
    }
    if (personId == 2) {
      this.person = new Person(2, 1, "Ana Valentina", "88888888888", "", "valentina@gmail.com", "654321", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
    }

    return this.person;
  }

}
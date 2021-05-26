import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';

import { Category } from './classes/Category';
import { Person } from './classes/Person';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private person?: Person;

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }

  public getCategories() {
    const categories: Category[] = [];
    for (let index = 1; index < 4; index++) {
      const category = new Category(index, "Categoria " + index)
      categories.push(category);
    }
    return categories;
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
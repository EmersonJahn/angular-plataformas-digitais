import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Category } from './classes/Category';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root'
})

export class AppService {

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

}
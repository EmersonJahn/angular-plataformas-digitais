import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plataformas-digitais';

  userId       = localStorage.getItem("userId");
  profilePhoto = localStorage.getItem("profilePhoto");

  openOptions = false;

  constructor(private dialog: MatDialog) { }

  public login() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {width: '350px'})
    
    dialogRef.afterClosed().subscribe(result => {
      this.userId       = localStorage.getItem("userId");
      this.profilePhoto = localStorage.getItem("profilePhoto");
    })
  }

  public logout() {
    localStorage.clear();
    this.userId       = localStorage.getItem("userId");
    this.profilePhoto = localStorage.getItem("profilePhoto");
    window.location.reload();
  }

}

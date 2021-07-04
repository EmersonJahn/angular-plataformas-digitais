import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plataformas-digitais';

  userId       = Number(localStorage.getItem("userId"));
  profilePhoto = localStorage.getItem("profilePhoto");

  openOptions = false;

  clientHeight: Number;

  constructor(private dialog: MatDialog, private appService: AppService) { 
    if (window.innerWidth > 991) {
      this.clientHeight = window.innerHeight - 56 - 232;      
      this.clientHeight = Number(this.clientHeight) - Number(this.clientHeight) * 0.1;      
    } else {
      this.clientHeight = window.innerHeight - 56 - 132;      
      this.clientHeight = Number(this.clientHeight) - Number(this.clientHeight) * 0.1;
    }
  }

  public login() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {width: '350px'})
    dialogRef.afterClosed().subscribe(result => {
      this.userId       = Number(localStorage.getItem("userId"));
      this.profilePhoto = localStorage.getItem("profilePhoto");
    })
  }

  public logout() {
    localStorage.clear();
    this.userId       = Number(localStorage.getItem("userId"));
    this.profilePhoto = localStorage.getItem("profilePhoto");
    window.location.reload();
  }

}

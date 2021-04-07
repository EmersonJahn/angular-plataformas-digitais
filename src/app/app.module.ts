import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DialogLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

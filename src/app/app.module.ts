import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';
import { ForgotPasswordComponent } from './dialogs/forgot-password/forgot-password.component';
import { ProblemRegistrationComponent } from './problem-registration/problem-registration.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';
import { DialogForgotPasswordComponent } from './dialogs/dialog-forgot-password/dialog-forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DialogLoginComponent,
    ForgotPasswordComponent,
    ProblemRegistrationComponent,
    ProjectRegistrationComponent,
    DialogForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

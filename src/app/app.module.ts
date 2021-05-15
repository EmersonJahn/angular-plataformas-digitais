import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';
import { DialogForgotPasswordComponent } from './dialogs/dialog-forgot-password/dialog-forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemVisualizationComponent } from './problems/problem-visualization/problem-visualization.component';
import { ProblemRegistrationComponent } from './problems/problem-registration/problem-registration.component';
import { ApprovalAnswersComponent } from './problems/approval-answers/approval-answers.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectRegistrationComponent } from './projects/project-registration/project-registration.component';
import { ProjectVisualizationComponent } from './projects/project-visualization/project-visualization.component';
import { ApprovalProjectMembersComponent } from './projects/approval-project-members/approval-project-members.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogLoginComponent,
    DialogForgotPasswordComponent,
    SignUpComponent,
    ProblemsComponent,
    ProblemRegistrationComponent,
    ProblemVisualizationComponent,
    ApprovalAnswersComponent,
    ProjectsComponent,
    ProjectRegistrationComponent,
    ProjectVisualizationComponent,
    ApprovalProjectMembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ShowHidePasswordModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

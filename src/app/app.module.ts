import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxLoadingModule } from 'ngx-loading';

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatBadgeModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ShowHidePasswordModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

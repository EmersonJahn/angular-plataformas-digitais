import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { ProblemsComponent } from './problems/problems.component';
import { ApprovalAnswersComponent } from './problems/approval-answers/approval-answers.component';
import { ProblemRegistrationComponent } from './problems/problem-registration/problem-registration.component';
import { ProblemVisualizationComponent } from './problems/problem-visualization/problem-visualization.component';
import { ProjectsComponent } from './projects/projects.component';
import { ApprovalProjectMembersComponent } from './projects/approval-project-members/approval-project-members.component';
import { ProjectRegistrationComponent } from './projects/project-registration/project-registration.component';
import { ProjectVisualizationComponent } from './projects/project-visualization/project-visualization.component';

const routes: Routes = [
  { path: '', redirectTo: '/problems', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'problems/aproval-answers', component: ApprovalAnswersComponent },
  { path: 'problems/registration', component: ProblemRegistrationComponent },
  { path: 'problems/visualization/:id', component: ProblemVisualizationComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/approval-members', component: ApprovalProjectMembersComponent },
  { path: 'projects/registration', component: ProjectRegistrationComponent },
  { path: 'projects/visualization', component: ProjectVisualizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

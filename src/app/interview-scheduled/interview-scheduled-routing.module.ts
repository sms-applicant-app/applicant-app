import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewScheduledPage } from './interview-scheduled.page';

const routes: Routes = [
  {
    path: '',
    component: InterviewScheduledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewScheduledPageRoutingModule {}

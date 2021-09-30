import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationCompletedPage } from './application-completed.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationCompletedPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionDetailsPage } from './position-details.page';

const routes: Routes = [
  {
    path: '',
    component: PositionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionDetailsPageRoutingModule {}

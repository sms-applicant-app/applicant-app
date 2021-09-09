import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenPositionsListPage } from './open-positions-list.page';

const routes: Routes = [
  {
    path: '',
    component: OpenPositionsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenPositionsListPageRoutingModule {}

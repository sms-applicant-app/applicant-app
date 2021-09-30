import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
/*  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }*/
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'positions/:storeId',
    loadChildren: () => import('./open-positions-list/open-positions-list.module').then( m => m.OpenPositionsListPageModule)
  },
  {
    path: 'position-details/:positionId',
    loadChildren: () => import('./position-details/position-details.module').then( m => m.PositionDetailsPageModule)
  },
  {
    path: 'application-completed',
    loadChildren: () => import('./application-completed/application-completed.module').then( m => m.ApplicationCompletedPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'interview-scheduled',
    loadChildren: () => import('./interview-scheduled/interview-scheduled.module').then( m => m.InterviewScheduledPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

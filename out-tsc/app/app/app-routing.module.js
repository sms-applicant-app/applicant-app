import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes = [
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
        loadChildren: () => import('./open-positions-list/open-positions-list.module').then(m => m.OpenPositionsListPageModule)
    },
    {
        path: 'position-details/:positionId',
        loadChildren: () => import('./position-details/position-details.module').then(m => m.PositionDetailsPageModule)
    },
    {
        path: 'application-completed',
        loadChildren: () => import('./application-completed/application-completed.module').then(m => m.ApplicationCompletedPageModule)
    },
    {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
            FormsModule,
            ReactiveFormsModule,
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
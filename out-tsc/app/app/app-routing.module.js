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
    }
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
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpenPositionsListPage } from './open-positions-list.page';
const routes = [
    {
        path: '',
        component: OpenPositionsListPage
    }
];
let OpenPositionsListPageRoutingModule = class OpenPositionsListPageRoutingModule {
};
OpenPositionsListPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], OpenPositionsListPageRoutingModule);
export { OpenPositionsListPageRoutingModule };
//# sourceMappingURL=open-positions-list-routing.module.js.map
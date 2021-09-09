import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PositionDetailsPage } from './position-details.page';
const routes = [
    {
        path: '',
        component: PositionDetailsPage
    }
];
let PositionDetailsPageRoutingModule = class PositionDetailsPageRoutingModule {
};
PositionDetailsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], PositionDetailsPageRoutingModule);
export { PositionDetailsPageRoutingModule };
//# sourceMappingURL=position-details-routing.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationCompletedPage } from './application-completed.page';
const routes = [
    {
        path: '',
        component: ApplicationCompletedPage
    }
];
let ApplicationCompletedPageRoutingModule = class ApplicationCompletedPageRoutingModule {
};
ApplicationCompletedPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ApplicationCompletedPageRoutingModule);
export { ApplicationCompletedPageRoutingModule };
//# sourceMappingURL=application-completed-routing.module.js.map
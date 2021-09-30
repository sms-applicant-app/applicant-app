import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InterviewScheduledPage } from './interview-scheduled.page';
const routes = [
    {
        path: '',
        component: InterviewScheduledPage
    }
];
let InterviewScheduledPageRoutingModule = class InterviewScheduledPageRoutingModule {
};
InterviewScheduledPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], InterviewScheduledPageRoutingModule);
export { InterviewScheduledPageRoutingModule };
//# sourceMappingURL=interview-scheduled-routing.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InterviewScheduledPageRoutingModule } from './interview-scheduled-routing.module';
import { InterviewScheduledPage } from './interview-scheduled.page';
let InterviewScheduledPageModule = class InterviewScheduledPageModule {
};
InterviewScheduledPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            InterviewScheduledPageRoutingModule
        ],
        declarations: [InterviewScheduledPage]
    })
], InterviewScheduledPageModule);
export { InterviewScheduledPageModule };
//# sourceMappingURL=interview-scheduled.module.js.map
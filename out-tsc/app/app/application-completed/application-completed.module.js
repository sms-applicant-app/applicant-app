import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicationCompletedPageRoutingModule } from './application-completed-routing.module';
import { ApplicationCompletedPage } from './application-completed.page';
let ApplicationCompletedPageModule = class ApplicationCompletedPageModule {
};
ApplicationCompletedPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ApplicationCompletedPageRoutingModule
        ],
        declarations: [ApplicationCompletedPage]
    })
], ApplicationCompletedPageModule);
export { ApplicationCompletedPageModule };
//# sourceMappingURL=application-completed.module.js.map
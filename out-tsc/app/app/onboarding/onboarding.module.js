import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { OnboardingPage } from './onboarding.page';
import { AngularMaterialModule } from '../material-design/material-design.module';
import { OnboardFormsListComponent } from "./onboard-forms-list/onboard-forms-list.component";
let OnboardingPageModule = class OnboardingPageModule {
};
OnboardingPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            OnboardingPageRoutingModule,
            AngularMaterialModule
        ],
        declarations: [OnboardingPage, OnboardFormsListComponent]
    })
], OnboardingPageModule);
export { OnboardingPageModule };
//# sourceMappingURL=onboarding.module.js.map
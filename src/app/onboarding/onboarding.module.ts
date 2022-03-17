import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import {AngularMaterialModule} from '../material-design/material-design.module';
import {OnboardFormsListComponent} from "./onboard-forms-list/onboard-forms-list.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  declarations: [OnboardingPage, OnboardFormsListComponent]
})
export class OnboardingPageModule {}

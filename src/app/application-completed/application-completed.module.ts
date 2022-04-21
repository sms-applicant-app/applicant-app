import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationCompletedPageRoutingModule } from './application-completed-routing.module';

import { ApplicationCompletedPage } from './application-completed.page';
import {AngularMaterialModule} from '../material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationCompletedPageRoutingModule,
    AngularMaterialModule
  ],
  declarations: [ApplicationCompletedPage]
})
export class ApplicationCompletedPageModule {}

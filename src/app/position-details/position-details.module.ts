import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PositionDetailsPageRoutingModule } from './position-details-routing.module';

import { PositionDetailsPage } from './position-details.page';
import {ComponentsModule} from '../components/components.module';
import {AngularMaterialModule} from '../material-design/material-design.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
      CommonModule,
      PositionDetailsPageRoutingModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      AngularMaterialModule
    ],
  declarations: [PositionDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PositionDetailsPageModule {}

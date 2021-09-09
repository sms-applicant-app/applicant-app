import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenPositionsListPageRoutingModule } from './open-positions-list-routing.module';

import { OpenPositionsListPage } from './open-positions-list.page';
import {AngularMaterialModule} from '../material-design/material-design.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OpenPositionsListPageRoutingModule,
        AngularMaterialModule
    ],
  declarations: [OpenPositionsListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenPositionsListPageModule {}

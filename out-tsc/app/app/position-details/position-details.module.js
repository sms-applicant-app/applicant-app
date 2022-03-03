import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PositionDetailsPageRoutingModule } from './position-details-routing.module';
import { PositionDetailsPage } from './position-details.page';
import { AngularMaterialModule } from '../material-design/material-design.module';
let PositionDetailsPageModule = class PositionDetailsPageModule {
};
PositionDetailsPageModule = __decorate([
    NgModule({
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
], PositionDetailsPageModule);
export { PositionDetailsPageModule };
//# sourceMappingURL=position-details.module.js.map
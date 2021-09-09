import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PositionDetailsPageRoutingModule } from './position-details-routing.module';
import { PositionDetailsPage } from './position-details.page';
import { ComponentsModule } from "../components/components.module";
let PositionDetailsPageModule = class PositionDetailsPageModule {
};
PositionDetailsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            PositionDetailsPageRoutingModule,
            ComponentsModule
        ],
        declarations: [PositionDetailsPage]
    })
], PositionDetailsPageModule);
export { PositionDetailsPageModule };
//# sourceMappingURL=position-details.module.js.map
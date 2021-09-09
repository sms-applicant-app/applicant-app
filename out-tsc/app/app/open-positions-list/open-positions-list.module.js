import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OpenPositionsListPageRoutingModule } from './open-positions-list-routing.module';
import { OpenPositionsListPage } from './open-positions-list.page';
import { AngularMaterialModule } from '../material-design/material-design.module';
let OpenPositionsListPageModule = class OpenPositionsListPageModule {
};
OpenPositionsListPageModule = __decorate([
    NgModule({
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
], OpenPositionsListPageModule);
export { OpenPositionsListPageModule };
//# sourceMappingURL=open-positions-list.module.js.map
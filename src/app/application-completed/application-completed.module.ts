import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationCompletedPageRoutingModule } from './application-completed-routing.module';

import { ApplicationCompletedPage } from './application-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationCompletedPageRoutingModule
  ],
  declarations: [ApplicationCompletedPage]
})
export class ApplicationCompletedPageModule {}

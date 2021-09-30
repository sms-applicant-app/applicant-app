import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterviewScheduledPageRoutingModule } from './interview-scheduled-routing.module';

import { InterviewScheduledPage } from './interview-scheduled.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterviewScheduledPageRoutingModule
  ],
  declarations: [InterviewScheduledPage]
})
export class InterviewScheduledPageModule {}

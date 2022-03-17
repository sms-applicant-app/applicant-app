import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddApplicantComponent} from './add-applicant/add-applicant.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AngularMaterialModule} from '../material-design/material-design.module';




@NgModule({
  declarations: [AddApplicantComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[AddApplicantComponent]
})
export class ComponentsModule { }

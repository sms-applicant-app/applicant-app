import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Applicant} from '../models/applicant';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicantService} from '../shared/applicant.service';
import {AuthService} from '../shared/auth.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  storeId: string;
  franchiseId: string;
 constructor(public router: Router) {
 }
 ngOnInit() {
 }
  receiveApplicantMessage($event){
    console.log('applicant added', $event);
    if ($event){
      this.router.navigate(['tabs/tab2']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobsService} from '../shared/jobs.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Applicant} from '../models/applicant';
import {FirestoreHelperService} from "../shared/firestore-helper.service";

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.page.html',
  styleUrls: ['./position-details.page.scss'],
})
export class PositionDetailsPage implements OnInit {
  positionDetails: any;
  positionId: string;
  franchiseId: string;
  storeId: string;
  applicantForm: FormGroup;
  newApplicant = new Applicant();

  constructor(public activatedRoute: ActivatedRoute, public jobsService: JobsService, public firestore: AngularFirestore, public router: Router, public fb: FormBuilder, public dbHelper: FirestoreHelperService) { }

  ngOnInit() {
    this.positionId = this.activatedRoute.snapshot.paramMap.get('positionId');
    console.log('positionId from route', this.positionId);
    this.getPositionsById(this.positionId);
    this.initApplicantForm();
  }
 getPositionsById(id){
    this.jobsService.getPositionsById(id).subscribe(data =>{
      this.positionDetails = data;
      console.log('position details', this.positionDetails.franchiseId);
      this.franchiseId = this.positionDetails.franchiseId;
      this.storeId = this.positionDetails.storeId;
    });
 }
 initApplicantForm(){
   this.applicantForm = this.fb.group({
     fullName: [''],
     email: [''],
     phoneNumber: [''],
   });
 }
 startApplicationProcess(){
    this.newApplicant.name = this.applicantForm.controls.fullName.value;
   this.newApplicant.email = this.applicantForm.controls.email.value;
   this.newApplicant.phoneNumber = this.applicantForm.controls.phoneNumber.value;
   this.newApplicant.jobId = this.positionId;
   this.newApplicant.storeId = this.storeId;
   this.newApplicant.franchiseId = this.franchiseId;
   this.newApplicant.status = 'APPLIED';
    console.log(this.newApplicant);
    const applicant = this.newApplicant;
    const email = this.applicantForm.controls.email.value;
    this.dbHelper.set(`applicant/${email}`, this.newApplicant).then(data =>{
      console.log('saving applicant', this.newApplicant);
    });

 }
  receiveApplicantMessage($event){
    console.log('applicant added', $event);
    localStorage.setItem('positionId', JSON.stringify(this.positionId));
    if ($event){
      this.router.navigate(['tabs/tab2']);
    }
  }
}

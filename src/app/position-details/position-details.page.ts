import { JobPosting } from './../models/JobListing';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import {JobsService} from '../shared/jobs.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Applicant} from '../models/applicant';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { FranchiseService } from '../shared/franchise.service';
@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.page.html',
  styleUrls: ['./position-details.page.scss'],
})
export class PositionDetailsPage implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  positionDetails: any;
  positionId: string;
  franchiseId: string;
  storeId: string;
  applicantForm: FormGroup;
  newApplicant = new Applicant();

  constructor(public activatedRoute: ActivatedRoute,
              public jobsService: JobsService,
              public firestore: AngularFirestore,
              public router: Router,
              public fb: FormBuilder,
              public dbHelper: FirestoreHelperService,
              private location: Location,
              private userService: UserService,
              private franchiseService: FranchiseService
  ) { }

  ngOnInit() {
    this.positionId = this.activatedRoute.snapshot.paramMap.get('positionId');
    this.initApplicantForm();
    this.getPositionsById(this.positionId);
  }

 getPositionsById(id){
    this.jobsService.getPositionsById(id).subscribe((data: JobPosting) =>{
      if (data) {
        this.positionDetails = data;
        this.franchiseId = this.positionDetails.franchiseId;
        this.storeId = this.positionDetails.storeId;
        this.getFranchiseeById(this.franchiseId);
      }
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
    this.newApplicant.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
    this.newApplicant.updatedAt = firebase.default.firestore.FieldValue.serverTimestamp();
    this.newApplicant.name = this.applicantForm.controls.fullName.value;
    this.newApplicant.email = this.applicantForm.controls.email.value;
    this.newApplicant.phoneNumber = this.applicantForm.controls.phoneNumber.value;
    this.newApplicant.jobId = this.positionId;
    this.newApplicant.positionId = this.positionId;
    this.newApplicant.storeId = this.storeId;
    this.newApplicant.franchiseId = this.franchiseId;
    this.newApplicant.status = 'APPLIED';
    this.newApplicant.applicantId = this.firestore.createId();
    const email = this.applicantForm.controls.email.value;
    this.dbHelper.set(`applicant/${email}`, this.newApplicant).then(data =>{
    console.log('saving applicant', this.newApplicant);
    this.receiveApplicantMessage();
  });
 }
  receiveApplicantMessage(){
    localStorage.setItem('applicant', this.newApplicant.email);
    localStorage.setItem('positionId', this.positionId);
    localStorage.setItem('typeFormUrl', this.positionDetails.typeFormUrlForInterview || '');
    this.router.navigate(['tabs/tab2']);
  }
  goBack(): void {
    this.location.back();
  }

  getFranchiseeById(franchiseId) {
    if (franchiseId.length === 20) {
      this.franchiseService.getFranchiseById(franchiseId).subscribe( res => {
        console.log('res', res);
        const franchiseData = res as any;
        const franchiseName = franchiseData.businessLegalName;
        localStorage.setItem('franchiseName', JSON.stringify(franchiseName));
      });
    } else {
      this.userService.getFranchiseUserByFranchiseId(franchiseId).subscribe(res => {
        if (res) {
          res.docs.forEach(doc => {
            const userData = doc.data() as any;
            const franchiseName = userData.fullName || userData.firstName;
            console.log('franchiseName', franchiseName);
            localStorage.setItem('franchiseName', JSON.stringify(franchiseName));
          });
        }
      });
    }
  }
}

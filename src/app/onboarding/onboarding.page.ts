import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {FirestoreHelperService} from "../shared/firestore-helper.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  federalDocs: any;
  stateDocs: any;
  companyDocs: any;
  onBordPackageId: string;
  applicantId: string;
  onboardingForms: any;
  job: any;
  onBoardingChangeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private dbHelper: FirestoreHelperService
  ) { }

  ngOnInit() {
    this.onBordPackageId = this.route.snapshot.paramMap.get('packageId');
    this.applicantId = this.route.snapshot.paramMap.get('applicantId');
    console.log(this.applicantId);
    this.getOnboardingForm();
    console.log('package id', this.onBordPackageId);
   // this.myGetOnboardingForms();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    if(this.onBoardingChangeSub) {
      this.onBoardingChangeSub.unsubscribe();
    }
  }
  myGetOnboardingForms(){
    const forms = this.firestore.collection('onboardPackages').doc(`${this.onBordPackageId}`).valueChanges();
    forms.subscribe((data: any) =>{
        this.onboardingForms = data;
      console.log('got forms', this.onboardingForms);
      });
  }
  getOnboardingForm() {
    if (!this.applicantId) return;
    this.onBoardingChangeSub = this.firestore.collection('applicant', ref => ref.where('email', '==', this.applicantId).limit(1)).get()
      .pipe(take(1))
      .subscribe((applicants: any) => {
         console.log('applicants', applicants.docs);
         if(applicants.docs.length > 0) {
          this.onboardingForms = applicants.docs[0].data().customForms || [];
         }
      });
  }
}

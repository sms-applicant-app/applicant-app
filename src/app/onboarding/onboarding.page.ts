import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  federalDocs: any;
  stateDocs: any;
  companyDocs: any;

  applicantId: string;
  onboardingForms: any[] = [];
  job: any;
  onBoardingChangeSub: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.applicantId = this.route.snapshot.paramMap.get('applicantId');
    console.log(this.applicantId);
    this.getOnboardingForm();
  }

  ngOnDestroy() {
    if(this.onBoardingChangeSub) {
      this.onBoardingChangeSub.unsubscribe();
    } 
  }

  getOnboardingForm() {
    if (!this.applicantId) return;
    this.onBoardingChangeSub = this.firestore.collection('applicant', ref => ref.where('applicantId', '==', this.applicantId).limit(1)).get()
      .pipe(take(1))
      .subscribe((applicants: any) => {
         console.log('applicants', applicants.docs);
         if(applicants.docs.length > 0) {
          this.onboardingForms = applicants.docs[0].data().customForms || [];
         } 
      });
  }
}

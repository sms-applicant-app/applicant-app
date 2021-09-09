import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

import {Applicant} from '../models/applicant';
import {FirestoreHelperService} from './firestore-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  message: string;
  applicantData: any;
  constructor(
    public firestore: AngularFirestore, public dbHelper: FirestoreHelperService
  ) { }
  getApplicantsByFranchise(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  async createApplicant(id: string, applicant: Applicant): Promise<any>{
    const applicantObj = {...applicant};
    console.log('adding applicant',applicant);
    return this.firestore.collection('applicant').add(applicantObj).then(docRef =>{
      const applicantId = docRef.id;
      localStorage.setItem('added-applicant', JSON.stringify(applicantId));
      console.log('added applicant id =', applicantId);
    });
  }
  getApplicantsByStore(storeId){
    return this.firestore.collection('applicants', ref => ref.where(`${storeId}`, '==', storeId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.applicantData = doc.data();
          });
        }
      });
  }

  createApplicantOnboardPacket(applicant: Applicant){
    return this.firestore.collection('applicant').add(`${applicant}`);
  }
  /*updateApplicant(applicant: Applicant){
    delete franchise.franchiseId;
    this.firestore.doc(`applicant/${id}`).update(applicant).then(resp =>{
      console.log('updated franchise', resp);
    });
  }*/
  deleteApplicant(applicantId){
    this.firestore.doc(`franchisee/${applicantId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}

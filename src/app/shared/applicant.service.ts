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
    return this.firestore.collection('applicant').doc(id).set(
      applicantObj
    ).then( docRef =>{
      const applicantId = docRef;
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
  updateApplicant(applicantId, data) {
    console.log('updated applicant', applicantId, data);
    this.firestore.doc(`applicant/${applicantId}`).update(data).then(resp => {
      console.log('updated applicant', applicantId, data);
    });
  }
  deleteApplicant(applicantId){
    this.firestore.doc(`franchisee/${applicantId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}

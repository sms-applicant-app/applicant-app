import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

import {Applicant} from '../models/applicant';
import {FirestoreHelperService} from './firestore-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(
    public firestore: AngularFirestore, public dbHelper: FirestoreHelperService
  ) { }
  getFranchiseOwner(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  getApplicantById(id): Observable<any>{
    return this.firestore.doc(`applicant/${id}`).valueChanges();
  }
  async createFranchise(applicant: Applicant): Promise<any>{
    const applicantObj = {...applicant};
    console.log('adding franchise',applicant);
    return this.firestore.collection('franchisee').add(applicantObj).then(docRef =>{
      const franchiseId = docRef.id;
      localStorage.setItem('added-franchisee', JSON.stringify(franchiseId));
      console.log('add franchise id =', franchiseId);
    });
  }
  getFranchises(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  findFranchisesStores(franchiseId: string, filter = '', sortOrder ='asc',
                       pageNumber = 0, pageSize = 3): Observable<Applicant[]>{
    return;
  }

  getAllFranchisesWithDbHelper(): Observable<any>{
    return this.dbHelper.collectionWithIds$('franchisee');
  }
  updateFranchise(franchiseId, data): Promise<any>{
    return this.firestore.collection('franchisee').doc(`${franchiseId}`).set({data}, {merge: true});
  }
  deleteFranchise(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}

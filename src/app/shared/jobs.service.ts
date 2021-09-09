import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
message: string;
jobsData: any;
  constructor(public firestore: AngularFirestore) { }
  getJobsByStore(storeId){
    return this.firestore.collection('jobs', ref => ref.where(`${storeId}`, '==', storeId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.jobsData = doc.data();
          });
        }
      });
  }
  getPositionsById(id): Observable<any>{
    return this.firestore.doc(`jobs/${id}`).valueChanges();
  }
}

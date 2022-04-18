import { Role } from './role';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  message: string;
  userData: any;
  constructor(
    public firestore: AngularFirestore
  ) {
  }
  getUserById(id): Observable<any> {
    console.log(id);
    return this.firestore.doc(`users/${id}`).valueChanges().pipe(take(1));
  }
  getUsersByFranchise(franchiseId){
    return this.firestore.collection('user', ref => ref.where(`${franchiseId}`, '==', franchiseId )).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.userData = doc.data();
            console.log('users from store', this.userData);
          });
        }
      });
  }
  getFranchiseUserByFranchiseId(franchiseId){
    return this.firestore.collection('users', ref => ref.where('franchiseId', '==', franchiseId )
    .where('role', '==', Role.franchisee )).get().pipe(take(1));
  }
}

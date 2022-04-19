import { Role } from './role';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import { FirestoreHelperService } from './firestore-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  message: string;
  userData: any;
  constructor(
    public firestore: AngularFirestore,
    private dbHelper: FirestoreHelperService,
  ) {
  }
  getUserById(id): Observable<any> {
    console.log(id);
    return this.firestore.doc(`users/${id}`).valueChanges().pipe(take(1));
  }
  // getFranchiseUserByStoreId(storeId: string): Observable<any> {
  //   return this.dbHelper.collectionWithIds$('users', ref => ref.where('storeId', '==', storeId)
  //   .where('role', '==', Role.franchisee))
  //   .pipe(take(1), map((users) => {
  //     return users.length > 0 ? users[0] : undefined;
  //   }));
  // }
  getFranchiseUserByFranchiseId(franchiseId){
    return this.firestore.collection('users', ref => ref.where('franchiseId', '==', franchiseId )
    .where('role', '==', Role.franchisee )).get().pipe(take(1));
  }
}

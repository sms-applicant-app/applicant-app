import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreHelperService } from './firestore-helper.service';
import { Store } from '../models/store';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(
    private fireStore: AngularFirestore,
    private dbHelper: FirestoreHelperService,
  ) {
  }

  getStoreByDocId(docId: string): Observable<Store | undefined> {
    return this.fireStore.doc(`store/${docId}`)
    .valueChanges()
    .pipe(take(1), map((data: any) => {
      if(!data) {return undefined;};
      return {
        id: docId,
        ...data
      } as Store;
    }));
  }

  getStoreByStoreId(storeId: string): Observable<Store | undefined> {
    return this.dbHelper
    .collectionWithIds$('store', ref => ref.where('storeId', '==', storeId))
    .pipe(take(1), map((stores: Array<Store>) => {
      return stores.length > 0 ? stores[0] : undefined;
    }));
  }

  getStoresByFranchiseId(franchiseId: string): Observable<Array<Store>> { 
    return this.dbHelper
   .collectionWithIds$('store', ref => ref.where('franchiseId', '==', franchiseId))
   .pipe(take(1), map((stores: Array<Store>) => {
    return stores;
   }));
  }
}
import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import { map, take } from 'rxjs/operators';
import { Store } from '../models/store';
import { FirestoreHelperService } from './firestore-helper.service';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
message: string;
jobsData: any;
  constructor(
    public firestore: AngularFirestore,
    private dbHelper: FirestoreHelperService
    ) { }

  getStoreByStoreId(storeId: string): Observable<Store | undefined> {
    return this.dbHelper.collectionWithIds$('store', ref => ref.where('storeId', '==', storeId))
    .pipe(take(1), map((stores: Array<Store>) => {
      return stores.length > 0 ? stores[0] : undefined;
    }));
  }
}

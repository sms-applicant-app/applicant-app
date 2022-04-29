import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(
    protected fireStore: AngularFirestore,
  ) {
  }

  getCollectionById<T>(collectionName: string, docId: string): Observable<T | null> {
    return this.fireStore.doc(`${collectionName}/${docId}`)
    .valueChanges()
    .pipe(take(1), map((data: any) => {
      if(!data) {return null;}
      return {
        id: docId,
        ...data
      } as T;
    }));
  }
}

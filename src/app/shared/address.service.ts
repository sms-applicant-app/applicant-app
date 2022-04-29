import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from '../models/address';
import { BaseService } from './base.service';
import { FirestoreHelperService } from './firestore-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {
  addressCache = new BehaviorSubject<{[key: string]: Address | null}>({});
  constructor(
    protected fireStore: AngularFirestore,
    protected dbHelper: FirestoreHelperService,
  ) {
    super(fireStore);
  }

  getAddressById(addressId: string): Observable<Address | null> {
    return this.getCollectionById<Address>('addresses', addressId);
  }
}

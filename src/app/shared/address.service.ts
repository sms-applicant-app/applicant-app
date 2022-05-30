import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { BaseService } from './base.service';
import { FirestoreHelperService } from './firestore-helper.service';
import { HttpClient } from '@angular/common/http';
import { RESPONSE_STATUS } from '../constants/responseStatus';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {
  addressCache = new BehaviorSubject<{[key: string]: Address | null}>({});
  constructor(
    protected fireStore: AngularFirestore,
    protected dbHelper: FirestoreHelperService,
    private httpClient: HttpClient

  ) {
    super(fireStore);
  }

  getAddressById(addressId: string): Observable<Address | null> {
    return this.getCollectionById<Address>('addresses', addressId);
  }

  // getAddressById(addressId: string): Observable<Address | null> {
  //   const url = `${environment.apiUrl}/api/v1/addresses/${addressId}`;
  //   return this.httpClient.get(url).pipe(map((res: any) => {
  //     if (res.status === RESPONSE_STATUS.SUCCESS && res.data) {
  //       console.log('====================================');
  //       console.log('res', res);
  //       console.log('====================================');
  //       return res.data;
  //     }
  //     return null;
  //   }));
  // }
}

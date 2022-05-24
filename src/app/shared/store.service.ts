import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RESPONSE_STATUS } from '../constants/responseStatus';
import { Store } from '../models/store';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
message: string;
jobsData: any;
  constructor(
    public firestore: AngularFirestore,
    private http: HttpClient,
    ) { }

  getStoreByStoreId(storeId: string): Observable<Store | undefined> {
    const url = `${environment.apiUrl}/api/v1/stores/${storeId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
       if (res.status === RESPONSE_STATUS.SUCCESS && res.data) {
         return res.data as Store;
       }
       return undefined;
    }));
  }
}

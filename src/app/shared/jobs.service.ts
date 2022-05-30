import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobPosting } from '../models/JobListing';
import { RESPONSE_STATUS } from '../constants/responseStatus';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
message: string;
jobsData: any;
  constructor(
    public firestore: AngularFirestore,
    private http: HttpClient,
    ) { }


  getJobByStore(storeId: string): Observable<Array<JobPosting>> {
    const url = `${environment.apiUrl}/api/v1/jobs/store/${storeId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        if (res.status === RESPONSE_STATUS.SUCCESS && res.data) {
          const jobs = res.data as Array<JobPosting>;
          return jobs;
        }
        return [];
      })
    );
  }

  getPositionsById(docId: string): Observable<JobPosting | undefined> {
    const url = `${environment.apiUrl}/api/v1/jobs/${docId}`;
    return this.http.get(url).pipe(map((res: any) => {
      if (res.status === RESPONSE_STATUS.SUCCESS && res.data) {
        return res.data;
      }
      return [];
    }));
  }
}

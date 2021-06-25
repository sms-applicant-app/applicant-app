import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcuityService {

  private applicationData = new BehaviorSubject<Object>({});
  currentApplicationData = this.applicationData.asObservable();

  acuityUrl: string = 'https://c08h27fdt1.execute-api.us-east-2.amazonaws.com/dev';
  thisAcuityMonthUrl: string = 'https://c08h27fdt1.execute-api.us-east-2.amazonaws.com/dev/get-months';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public getAppointments() {
    return this.http.get<any>(`${this.acuityUrl}/appointments`, this.httpOptions);
  }
  public getAvailableDaysOfMonth(month, timezone) {
    const options = { params: new HttpParams().set('month', month).set('appointmentTypeID', '14310202').set('timezone', timezone) };
    return this.http.get<any>(`${this.acuityUrl}/get-dates`, options);
  }
  public getAvailableTimesOfDay(date, timezone) {
    const options = { params: new HttpParams().set('date', date).set('appointmentTypeID', '14310202').set('timezone', timezone) };
    return this.http.get<any>(`${this.acuityUrl}/get-times`, options);
  }

  setAppointmentData(data) {
    this.applicationData.next(data);
  }
}

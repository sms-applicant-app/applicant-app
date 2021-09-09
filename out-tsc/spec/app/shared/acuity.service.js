import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
let AcuityService = class AcuityService {
    constructor(http) {
        this.http = http;
        this.applicationData = new BehaviorSubject({});
        this.currentApplicationData = this.applicationData.asObservable();
        this.acuityUrl = 'https://c08h27fdt1.execute-api.us-east-2.amazonaws.com/dev';
        this.thisAcuityMonthUrl = 'https://c08h27fdt1.execute-api.us-east-2.amazonaws.com/dev/get-months';
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }
    getAppointments() {
        return this.http.get(`${this.acuityUrl}/appointments`, this.httpOptions);
    }
    getAvailableDaysOfMonth(month, timezone) {
        const options = { params: new HttpParams().set('month', month).set('appointmentTypeID', '14310202').set('timezone', timezone) };
        return this.http.get(`${this.acuityUrl}/get-dates`, options);
    }
    getAvailableTimesOfDay(date, timezone) {
        const options = { params: new HttpParams().set('date', date).set('appointmentTypeID', '14310202').set('timezone', timezone) };
        return this.http.get(`${this.acuityUrl}/get-times`, options);
    }
    setAppointmentData(data) {
        this.applicationData.next(data);
    }
};
AcuityService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AcuityService);
export { AcuityService };
//# sourceMappingURL=acuity.service.js.map
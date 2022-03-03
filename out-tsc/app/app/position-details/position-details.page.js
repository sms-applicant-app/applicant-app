import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Applicant } from '../models/applicant';
let PositionDetailsPage = class PositionDetailsPage {
    constructor(activatedRoute, jobsService, firestore, router, fb, dbHelper) {
        this.activatedRoute = activatedRoute;
        this.jobsService = jobsService;
        this.firestore = firestore;
        this.router = router;
        this.fb = fb;
        this.dbHelper = dbHelper;
        this.newApplicant = new Applicant();
    }
    ngOnInit() {
        this.positionId = this.activatedRoute.snapshot.paramMap.get('positionId');
        console.log('positionId from route', this.positionId);
        this.getPositionsById(this.positionId);
        this.initApplicantForm();
    }
    getPositionsById(id) {
        this.jobsService.getPositionsById(id).subscribe(data => {
            this.positionDetails = data;
            console.log('position details', this.positionDetails.franchiseId);
            this.franchiseId = this.positionDetails.franchiseId;
            this.storeId = this.positionDetails.storeId;
        });
    }
    initApplicantForm() {
        this.applicantForm = this.fb.group({
            fullName: [''],
            email: [''],
            phoneNumber: [''],
        });
    }
    startApplicationProcess() {
        this.newApplicant.name = this.applicantForm.controls.fullName.value;
        this.newApplicant.email = this.applicantForm.controls.email.value;
        this.newApplicant.phoneNumber = this.applicantForm.controls.phoneNumber.value;
        this.newApplicant.jobId = this.positionId;
        this.newApplicant.storeId = this.storeId;
        this.newApplicant.franchiseId = this.franchiseId;
        this.newApplicant.status = 'APPLIED';
        const email = this.applicantForm.controls.email.value;
        this.dbHelper.set(`applicant/${email}`, this.newApplicant).then(data => {
            console.log('saving applicant', this.newApplicant);
            this.receiveApplicantMessage();
        });
    }
    receiveApplicantMessage() {
        localStorage.setItem('positionId', JSON.stringify(this.positionId));
        this.router.navigate(['tabs/tab2']);
    }
};
PositionDetailsPage = __decorate([
    Component({
        selector: 'app-position-details',
        templateUrl: './position-details.page.html',
        styleUrls: ['./position-details.page.scss'],
    })
], PositionDetailsPage);
export { PositionDetailsPage };
//# sourceMappingURL=position-details.page.js.map
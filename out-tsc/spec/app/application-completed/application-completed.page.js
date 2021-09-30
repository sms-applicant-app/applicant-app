import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ApplicationCompletedPage = class ApplicationCompletedPage {
    constructor(jobService, applicantService, authService) {
        this.jobService = jobService;
        this.applicantService = applicantService;
        this.authService = authService;
    }
    ngOnInit() {
        this.positionId = JSON.parse(localStorage.getItem('positionId'));
        this.userData = JSON.parse(localStorage.getItem('user'));
        this.jobService.getPositionsById(this.positionId).subscribe(data => {
            this.positionData = data;
            console.log('position,', this.positionData);
            this.updateApplicantWithJobId();
        });
    }
    // update applicant with position they applied for
    // alert hiring manager application submitted
    updateApplicantWithJobId() {
        const applicantId = this.userData.email;
        console.log('applicant id', applicantId);
        this.applicantService.updateApplicant(applicantId, { jobId: this.positionId, status: 'applicantSubmitted' });
    }
    logout() {
        this.authService.SignOut().then(data => 'logged out!!');
    }
};
ApplicationCompletedPage = __decorate([
    Component({
        selector: 'app-application-completed',
        templateUrl: './application-completed.page.html',
        styleUrls: ['./application-completed.page.scss'],
    })
], ApplicationCompletedPage);
export { ApplicationCompletedPage };
//# sourceMappingURL=application-completed.page.js.map
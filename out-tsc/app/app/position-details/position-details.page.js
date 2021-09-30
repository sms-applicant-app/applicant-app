import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PositionDetailsPage = class PositionDetailsPage {
    constructor(activatedRoute, jobsService, firestore, router) {
        this.activatedRoute = activatedRoute;
        this.jobsService = jobsService;
        this.firestore = firestore;
        this.router = router;
    }
    ngOnInit() {
        this.positionId = this.activatedRoute.snapshot.paramMap.get('positionId');
        console.log('positionId from route', this.positionId);
        this.getPositionsById(this.positionId);
    }
    getPositionsById(id) {
        this.jobsService.getPositionsById(id).subscribe(data => {
            this.positionDetails = data;
            console.log('position details', this.positionDetails.franchiseId);
            this.franchiseId = this.positionDetails.franchiseId;
            this.storeId = this.positionDetails.storeId;
        });
    }
    receiveApplicantMessage($event) {
        console.log('applicant added', $event);
        localStorage.setItem('positionId', JSON.stringify(this.positionId));
        if ($event) {
            this.router.navigate(['tabs/tab2']);
        }
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
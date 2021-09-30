import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let OpenPositionsListPage = class OpenPositionsListPage {
    constructor(jobsService, route, firestore, dbHelper, router) {
        this.jobsService = jobsService;
        this.route = route;
        this.firestore = firestore;
        this.dbHelper = dbHelper;
        this.router = router;
        this.positions = [];
        this.displayColumns = ['title', 'jobType', 'dateCreated', 'actions'];
    }
    ngOnInit() {
        /*this.route.queryParams
          .subscribe(params =>{
            this.storeId = params.storeId;
            console.log(this.storeId, 'retrieving store', params);
          });*/
        this.storeId = this.route.snapshot.paramMap.get('storeId');
        console.log('store id from URL', this.storeId);
        this.getJobsByStore(this.storeId);
    }
    getJobsByStore(storeId) {
        //TODo add another where clause to get only open positions
        this.firestore.collection('jobs', ref => ref.where('storeId', '==', `${storeId}`)).get()
            .subscribe(ss => {
            this.positions = [];
            console.log('getting positions');
            if (ss.docs.length === 0) {
                return this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.jobId = doc.id;
                    this.jobsData = doc.data();
                    this.positions.push({ id: this.jobId, data: this.jobsData });
                    console.log('jobs', this.positions);
                    this.dataSource = new MatTableDataSource(this.positions);
                });
            }
        });
    }
    openPositionDetails(positionId) {
        console.log('position Id', positionId);
        this.router.navigate([`/position-details/${positionId}`]);
    }
};
OpenPositionsListPage = __decorate([
    Component({
        selector: 'app-open-positions-list',
        templateUrl: './open-positions-list.page.html',
        styleUrls: ['./open-positions-list.page.scss'],
    })
], OpenPositionsListPage);
export { OpenPositionsListPage };
//# sourceMappingURL=open-positions-list.page.js.map
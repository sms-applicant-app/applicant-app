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
        this.jobs = [];
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
    /*getJobsByStore2(){
      this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
        .subscribe(jobs =>{
          this.jobs = [];
          if(jobs.docs.length === 0){
            console.log('no jobs with that store', this.storeId);
          } else {
            jobs.forEach(job =>{
              const j = job.data();
              const positionId = job.id;
              this.jobs.push({id: positionId, position:j});
              console.log(this.jobs, 'id', positionId);
              this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
            });
          }
        });
  
    }*/
    getJobsByStore(storeId) {
        //TODo add another where clause to get only open positions
        console.log('store id in query', storeId);
        this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
            .subscribe(jobs => {
            this.jobs = [];
            if (jobs.docs.length === 0) {
                console.log('no jobs with that store', storeId);
            }
            else {
                jobs.forEach(job => {
                    const j = job.data();
                    const positionId = job.id;
                    this.jobs.push({ id: positionId, position: j });
                    console.log(this.jobs, 'id', positionId);
                    this.dataSource = new MatTableDataSource(this.jobs);
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
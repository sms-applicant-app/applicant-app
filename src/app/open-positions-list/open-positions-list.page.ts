import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Position} from '@angular/compiler';
import {MatTableDataSource} from '@angular/material/table';
import {FirestoreHelperService} from '../shared/firestore-helper.service';

@Component({
  selector: 'app-open-positions-list',
  templateUrl: './open-positions-list.page.html',
  styleUrls: ['./open-positions-list.page.scss'],
})
export class OpenPositionsListPage implements OnInit {
  storeId: string;
  message: string;
  jobsData: any;
  jobId: string;
  positions: any = [];
  dataSource:  MatTableDataSource<Position>;
  displayColumns= ['title', 'jobType', 'dateCreated', 'actions'];
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public firestore: AngularFirestore,  public dbHelper: FirestoreHelperService,  public router: Router) {
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
  getJobsByStore(storeId){
    //TODo add another where clause to get only open positions
    this.firestore.collection('jobs', ref => ref.where('storeId', '==', `${storeId}`)).get()
      .subscribe(ss => {
        this.positions = [];
        console.log('getting positions');
        if (ss.docs.length === 0) {
          return this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.jobId = doc.id;
            this.jobsData = doc.data();
            this.positions.push({id: this.jobId, data: this.jobsData});
            console.log('jobs', this.positions);
            this.dataSource = new MatTableDataSource<Position>(this.positions);
          });
        }
      });
  }
  openPositionDetails(positionId){
    console.log('position Id', positionId);
    this.router.navigate([`/position-details/${positionId}`]);
  }
}

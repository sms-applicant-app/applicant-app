import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Position} from '@angular/compiler';
import {MatTableDataSource} from '@angular/material/table';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {JobListing} from "../models/JobListing";

@Component({
  selector: 'app-open-positions-list',
  templateUrl: './open-positions-list.page.html',
  styleUrls: ['./open-positions-list.page.scss'],
})
export class OpenPositionsListPage implements OnInit {
  storeId: any;
  message: string;
  jobsData: any;
  jobId: string;
  jobs: any = [];
  dataSource:  MatTableDataSource<Position>;
  displayColumns= ['title', 'jobType', 'dateCreated', 'actions'];
  constructor(public jobsService: JobsService,
              public route: ActivatedRoute,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public router: Router) {
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
  fixStoreId(){
    const jobs = this.dbHelper.collectionWithIds$('jobs');
    jobs.forEach(j =>{
      for(let i = 0; i < j.length; i++){

        const id = j[i].id;
        const storeId = j[i].storeId;
        const storeIdString = storeId.toString();
        console.log('getting all jobs with Ids', j[i].storeId);
        if(typeof storeId !== 'string'){
          this.firestore.doc(`jobs/${id}`).update({
            storeId: storeIdString
          }).then(res =>{
            console.log('updated store id', id);
          });
        }
      }

    }).then(data => {
      return 'fixed';
    });
    const jobsRef = this.firestore.collection('jobs', ref => ref.where('storeId','!=', null)).valueChanges();
    jobsRef.subscribe(data =>{
      data.forEach(job =>{
      //  console.log('getting all jobs', job);
      });
    });
  }


  getJobsByStore(storeId: any){
    this.fixStoreId();
    if(typeof storeId === 'string'){
      console.log('store Id is a string');
      this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
        .subscribe(jobs =>{
          this.jobs = [];
          if(jobs.docs.length === 0){
            console.log('no jobs with that store', storeId);
          } else {
            jobs.forEach(job =>{
              const j = job.data() as any;
              const positionId = job.id;
              if (j.positionOpen) {
                this.jobs.push({id: positionId, position:j});
              }
              console.log(this.jobs, 'id', positionId);
              this.dataSource = new MatTableDataSource<Position>(this.jobs);
            });
          }
        });
    } else {
      console.log('what is store id', storeId);
    }
    //TODo add another where clause to get only open positions
    console.log('store id in query', storeId);
  }
  openPositionDetails(positionId){
    console.log('position Id', positionId);
    this.router.navigate([`/position-details/${positionId}`]);
  }
}

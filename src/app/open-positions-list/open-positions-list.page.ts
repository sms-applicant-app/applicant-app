import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Position} from '@angular/compiler';
import {MatTableDataSource} from '@angular/material/table';
import { LoadingController } from '@ionic/angular';

import {FirestoreHelperService} from '../shared/firestore-helper.service';
import { UserService } from '../shared/user.service';
import { StoreService } from '../shared/store.service';
import {JobsService} from '../shared/jobs.service';

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
  franchiseData: any = [];
  isLoading: boolean;
  constructor(public jobsService: JobsService,
              public route: ActivatedRoute,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public router: Router,
              private userService: UserService,
              private storeService: StoreService,
              public loadingController: LoadingController
              ) {
  }
  ngOnInit() {
    this.storeId = this.route.snapshot.paramMap.get('storeId');
    localStorage.setItem('storeId', JSON.stringify(this.storeId));
    console.log('store id from URL', this.storeId);
    this.presentLoading();
    this.getStoreDetail(this.storeId);
  }
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
      this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
        .subscribe(jobs =>{
          this.jobs = [];
          if(jobs.docs.length === 0){
            console.log('no jobs with that store', storeId);
          } else {
            jobs.forEach(job =>{
              const j = job.data();
              const positionId = job.id;
              this.jobs.push({id: positionId, position:j});
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
  openPositionDetails(position){
    localStorage.setItem('positionSelected', JSON.stringify(position));
    this.router.navigate([`/position-details/${position.id}`]);
  }
  getStoreDetail(storeId: string) {
    this.storeService.getStoreByStoreId(storeId).subscribe(res => {
      if (res) {
        const franchiseId = res.franchiseId;
        this.getFranchiseDetail(franchiseId);
      } else {
        console.log('store not found');
      }
    });
  }
  getFranchiseDetail(franchiseId: string) {
    this.userService.getFranchiseUserByFranchiseId(franchiseId).subscribe(users => {
      if (users.docs.length) {
        users.docs.forEach(user => {
          const u = user.data();
          this.franchiseData.push(u);
        });
        this.closeLoading();
        if (this.franchiseData[0].isFranchiseOwner) {
          this.getJobsByStore(this.storeId);
        } else {
          this.jobs = [];
        }
      } else {
        this.closeLoading();
        console.log('user not found');
      }
    });
  }
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  closeLoading() {
    this.loadingController.dismiss();
    this.isLoading = false;
  }
}

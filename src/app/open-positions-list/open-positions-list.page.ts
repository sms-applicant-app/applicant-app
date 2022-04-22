import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Position} from '@angular/compiler';
import {MatTableDataSource} from '@angular/material/table';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import { AddressService } from '../shared/address.service';
import { STATES } from '../constants/state';

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
  originJobs: any = [];
  dataSource:  MatTableDataSource<Position>;
  displayColumns= ['title', 'jobType', 'dateCreated', 'actions'];
  searchValue: string;
  constructor(
    public jobsService: JobsService,
    public addressService: AddressService,
    public route: ActivatedRoute,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public router: Router
  ) {}
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
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i = 0; i < j.length; i++){
        const id = j[i].id;
        const storeId = j[i].storeId;
        const storeIdString = storeId.toString();
        console.log('getting all jobs with Ids', j[i].storeId);
        if(typeof storeId !== 'string'){
          this.firestore.doc(`jobs/${id}`).update({
            storeId: storeIdString
          }).then(() =>{
            console.log('updated store id', id);
          });
        }
      }

    }).then(data => 'fixed');
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
            jobs.forEach(async job =>{
              const j = job.data() as any;
              const positionId = job.id;
              if (j.positionOpen) {
                const address = await this.addressService.getAddressById(j.addressId).toPromise();
                this.originJobs.push({id: positionId, position:j, address});
                this.jobs = [...this.originJobs];
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

  getStateName(stateSlug) {
    return STATES.find(state => state.value === stateSlug).name;
  }

  searchChange(term) {
    if (!term) {
      this.jobs =  [...this.originJobs];
      return;
    }
    this.jobs = this.originJobs.filter((job) => (
      job.position.jobTitle.toLowerCase().includes(term.toLowerCase()) ||
      job.address?.city.toLowerCase().includes(term.toLowerCase()) ||
      this.getStateName(job.address?.state).toLowerCase().includes(term.toLowerCase())
    ));
  }

  resetSearch() {
    this.searchValue = '';
    this.jobs = [...this.originJobs];
  }
}

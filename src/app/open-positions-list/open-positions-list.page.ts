import { StoreService } from './../shared/store.service';
import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Position} from '@angular/compiler';
import {MatTableDataSource} from '@angular/material/table';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import { AddressService } from '../shared/address.service';
import { STATES } from '../constants/state';
import { Store } from '../models/store';

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
  storeData: Store;
  constructor(
    public jobsService: JobsService,
    public addressService: AddressService,
    public route: ActivatedRoute,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public router: Router,
    private storeService: StoreService
  ) {}
  ngOnInit() {
    this.storeId = this.route.snapshot.paramMap.get('storeId');
    localStorage.setItem('storeId', JSON.stringify(this.storeId));
    this.getJobsByStore(this.storeId);
    this.getStoreByStoreId(this.storeId);
  }

  getJobsByStore(storeId: any){
    this.jobsService.getJobByStore(storeId).subscribe((res: any) => {
      const jobs = res;
      jobs.forEach(async job =>{
        if (job.positionOpen) {
          const address = await this.addressService.getAddressById(job.addressId).toPromise();
          this.originJobs.push({id: job.id, position:job, address});
          this.jobs = [...this.originJobs];
        }
        this.dataSource = new MatTableDataSource<Position>(this.jobs);
      });
    });
  }
  openPositionDetails(position){
    localStorage.setItem('positionSelected', JSON.stringify(position));
    this.router.navigate([`/position-details/${position.id}`]);
  }

  getStateName(stateSlug) {
    return STATES.find(state => state.value === stateSlug).name;
  }

  jobfilter(job, term) {
    if (job.address) {
      return job.position.jobTitle.toLowerCase().includes(term.toLowerCase()) ||
      job.address?.city.toLowerCase().includes(term.toLowerCase()) ||
      this.getStateName(job.address?.state).toLowerCase().includes(term.toLowerCase());
    } else {
      return job.position.jobTitle.toLowerCase().includes(term.toLowerCase());
    }
  }

  searchChange(term) {
    if (!term) {
      this.jobs =  [...this.originJobs];
      return;
    }
    this.jobs = this.originJobs.filter((job) => this.jobfilter(job, term));
  }

  resetSearch() {
    this.searchValue = '';
    this.jobs = [...this.originJobs];
  }

  getStoreByStoreId(storeId: string) {
    this.storeService.getStoreByStoreId(storeId).subscribe((res: Store) => {
      if (res) {
        this.storeData = res;
      } else {
        console.log('Store not found');
      }
    });
  }
}

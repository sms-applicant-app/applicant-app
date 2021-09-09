import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobsService} from '../shared/jobs.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.page.html',
  styleUrls: ['./position-details.page.scss'],
})
export class PositionDetailsPage implements OnInit {
  positionDetails: any;
  positionId: string;
  franchiseId: string;
  storeId: string;

  constructor(public activatedRoute: ActivatedRoute, public jobsService: JobsService, public firestore: AngularFirestore, public router: Router) { }

  ngOnInit() {
    this.positionId = this.activatedRoute.snapshot.paramMap.get('positionId');
    console.log('positionId from route', this.positionId);
    this.getPositionsById(this.positionId);
  }
 getPositionsById(id){
    this.jobsService.getPositionsById(id).subscribe(data =>{
      this.positionDetails = data;
      console.log('position details', this.positionDetails.franchiseId);
      this.franchiseId = this.positionDetails.franchiseId;
      this.storeId = this.positionDetails.storeId;
    });
 }
  receiveApplicantMessage($event){
    console.log('applicant added', $event);
    if ($event){
      this.router.navigate(['tabs/tab2']);
    }
  }
}

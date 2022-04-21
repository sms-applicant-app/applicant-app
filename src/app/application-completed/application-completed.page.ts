import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ApplicantService} from '../shared/applicant.service';
import {AuthService} from '../shared/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-application-completed',
  templateUrl: './application-completed.page.html',
  styleUrls: ['./application-completed.page.scss'],
})
export class ApplicationCompletedPage implements OnInit {
  positionId: string;
  positionData: any;
  userData: any;
  franchiseName: string;
  constructor(
    public jobService: JobsService,
    public applicantService: ApplicantService,
    public authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.positionData = JSON.parse(localStorage.getItem('positionSelected'));
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.franchiseName = JSON.parse(localStorage.getItem('franchiseName'));
    this.updateApplicantWithJobId();
  }

  updateApplicantWithJobId(){
    const applicantId = this.userData.email;
    this.applicantService.updateApplicant(applicantId, {jobId: this.positionData.id, status: 'applicantSubmitted'});
  }
  logout(){
    this.authService.SignOut().then(data => 'logged out!!');
  }
  goListJob() {
    const storeId = JSON.parse(localStorage.getItem('storeId'));
    this.router.navigate([`/positions/${storeId}`]);
  }

}

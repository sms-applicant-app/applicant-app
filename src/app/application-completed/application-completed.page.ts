import { Component, OnInit } from '@angular/core';
import {JobsService} from '../shared/jobs.service';
import {ApplicantService} from '../shared/applicant.service';
import {AuthService} from '../shared/auth.service';
import firebase from 'firebase';
@Component({
  selector: 'app-application-completed',
  templateUrl: './application-completed.page.html',
  styleUrls: ['./application-completed.page.scss'],
})
export class ApplicationCompletedPage implements OnInit {
  positionId: string;
  positionData: any;
  userData: any;
  constructor(public jobService: JobsService, public applicantService: ApplicantService, public authService: AuthService) { }

  ngOnInit() {
    this.positionId = JSON.parse(localStorage.getItem('positionId'));
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.jobService.getPositionsById(this.positionId).subscribe(data =>{
      this.positionData = data;
      console.log('position,', this.positionData);
      this.updateApplicantWithJobId();
    });

  }
  // update applicant with position they applied for
  // alert hiring manager application submitted
  updateApplicantWithJobId(){
    const applicantId = this.userData.email;
    console.log('applicant id', applicantId);
    this.applicantService.updateApplicant(applicantId, {jobId: this.positionId, status: 'applicantSubmitted'});
  }
  logout(){
    this.authService.SignOut().then(data => 'logged out!!');
  }

}

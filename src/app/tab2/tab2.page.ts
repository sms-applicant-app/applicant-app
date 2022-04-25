import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  interviewFormUrl: string;

  constructor(
    public sanitizer: DomSanitizer
  ) {
    const jobId = localStorage.getItem('positionId');
    const applicant = localStorage.getItem('applicant');
    //this.interviewFormUrl = `https://l1ii9124kpx.typeform.com/to/qDDm0ExR?typeform-medium=embed-snippet&jobId=${jobId || ''}&applicant=${applicant || ''}`;
    this.interviewFormUrl = `https://l1ii9124kpx.typeform.com/to/r0LqAN89?typeform-medium=embed-snippet&jobId=${jobId || ''}&applicant=${applicant || ''}`;
  }
}

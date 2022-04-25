import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  interviewFormUrl: string;
  interviewFormUrlSafe: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer
  ) {
    const jobId = localStorage.getItem('positionId');
    const applicant = localStorage.getItem('applicant');
    const typeFormUrl = localStorage.getItem('typeFormUrl');
    const interviewFormUrl = `${typeFormUrl || 'https://l1ii9124kpx.typeform.com/to/qDDm0ExR'}?typeform-medium=embed-snippet&jobId=${jobId || ''}&applicant=${applicant || ''}`;
    this.interviewFormUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(interviewFormUrl);
  }
}

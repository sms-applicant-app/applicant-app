import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
export interface Section {
  name: string;
  link: string;
  updated: Date;
}

@Component({
  selector: 'app-onboard-forms-list',
  templateUrl: './onboard-forms-list.component.html',
  styleUrls: ['./onboard-forms-list.component.scss'],
})
export class OnboardFormsListComponent implements OnInit {

  @Input() onboardingForms: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    console.log('incoming forms', this.onboardingForms);
  }

  downloadForm(url: string) {
    let fileName = '';
    fileName = url.split('/').pop().split('?')[0];
    this.httpClient.get(url, { responseType: 'blob' }).subscribe((response: any) => {
      const fileURL = window.URL.createObjectURL(new Blob([response]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  }
}

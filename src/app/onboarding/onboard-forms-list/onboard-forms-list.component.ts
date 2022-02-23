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
  @Input()federalDocs;
  @Input()stateDocs;
  @Input()companyDocs;
  federals: Section[] = [
    {
      name: 'Photos',
      link: 'string',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      link: 'string',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      link: 'string',
      updated: new Date('1/28/16'),
    },
  ];
  states: Section[] = [
    {
      name: 'Link to W4 in storage',
      link: 'string',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      link: 'string',
      updated: new Date('1/18/16'),
    },
  ];
  company: Section[] = [
    {
      name: 'Link to W4 in storage',
      link: 'string',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      link: 'string',
      updated: new Date('1/18/16'),
    },
  ];
  constructor() { }

  ngOnInit() {}

}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Patient} from '../shared/patient';
import {Subscription} from 'rxjs';
import {PatientService} from '../shared/patient.service';
import {Router} from '@angular/router';
import { DayConfig } from 'ion2-calendar';
import {AlertController, IonInfiniteScroll} from '@ionic/angular';
import { AcuityService } from '../shared/acuity.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input()  email: string;
  @Input() phoneNumber: string;
  @ViewChild(IonInfiniteScroll,  {static: false} ) infiniteScroll: IonInfiniteScroll;

  date: string;
  type: 'string';
  daysConfiguration: DayConfig[] = [
    {
      date: new Date(2020,5,25),
      disable: true
    },
    {
      date: new Date(2020,5,26),
      disable: true
    },
    {
      date: new Date(2020,5,27),
      disable: true,
      marked: true
    }
  ];
  appointmentDates: Array<any> = [];
  appointmentTimes: Array<any> = [];
  previousDate: string;
  currentMonth: any;
  selectedDate: any;
  isTimesVisible: boolean = false;
  selectedTime: any;
  applicationData: any;

  patient: Patient;
  sub: Subscription;
  scheduleDateForm: FormGroup;
  alert: any;
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router, private acuityService: AcuityService, public alertController: AlertController) {
    this.scheduleDateForm = fb.group({
      appointmentDate: [''],
    });
  }
  ngOnInit(): void {
    this.acuityService.currentApplicationData.subscribe(message => {
      console.log('tab1 data ===========>', message, JSON.stringify(this.firstName));
      this.applicationData = message;
    });
    this.updatePatient();
    let currentDate = new Date();
    this. currentMonth = ("0"+(currentDate.getMonth()+1)).slice(-2);
    console.log(`${currentDate.getFullYear()}-${("0"+(currentDate.getMonth()+1)).slice(-2)}`);
    this.getDates(`${currentDate.getFullYear()}-${("0"+(currentDate.getMonth()+1)).slice(-2)}`);
  }
  async initializeAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  onChanged($event) {
    this.isTimesVisible = false;
    console.log('event =============>', $event.format('MM'));
    let isDateIncluded = this.checkDateIncludedInMonth($event.format('YYYY-MM-DD'));
    console.log('isDateIncluded =======>', this.currentMonth, $event.format('MM'), isDateIncluded);
    if(this.currentMonth == $event.format('MM')) {
      if(isDateIncluded) {
        if(this.previousDate !== $event.format('YYYY-MM-DD')) {
          this.appointmentTimes = [];
          this.previousDate = $event.format('YYYY-MM-DD');
          this.selectedDate = $event.format('YYYY-MM-DD');
          this.getTimes($event.format('YYYY-MM-DD'));
        }
      } else {
        this.initializeAlert('Sorry, cannot book appointment on this date');
      }
    } else {
      this.date = "";
      console.log("date ======>", this.date);
      this.initializeAlert('Select date from the current month');
    }
  }
  gotoNextTab() {
    console.log('selected time ', this.selectedDate,this.selectedTime);
    this.applicationData.selectedDate = this.selectedDate;
    this.applicationData.selectedTime = this.selectedTime;
    this.acuityService.setAppointmentData(this.applicationData);
    this.router.navigateByUrl('tabs/tabs/tab3');
  }
  updatePatient() {
    this.sub = this.patientService.patientUpdate$.subscribe(() => {
      const { appointmentDate } = this.scheduleDateForm.value;
      this.patient.appointmentDate = appointmentDate;
    });
  }
  getDates(month) {
    console.log('Timezone ========>', Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.acuityService.getAvailableDaysOfMonth(month, 'America/Los_Angeles').subscribe(result =>{
      this.appointmentDates = result.dates;
      console.log('Dates result ============>', this.appointmentDates);
    });
  }
  onMonthChange(event) {
    this.date = null;
    this.previousDate = null;
    this.selectedDate = null;
    this.currentMonth = ("0"+event.newMonth.months).slice(-2);
    this.getDates(`${event.newMonth.years}-${("0"+event.newMonth.months).slice(-2)}`);
  }
  getTimes(date) {
    console.log('Timezone ========>', Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.acuityService.getAvailableTimesOfDay(date, 'America/Los_Angeles').subscribe(result =>{
      this.appointmentTimes = result.times;
      this.isTimesVisible = true;
      console.log('time result ============>', this.appointmentTimes);
    });
  }
  checkDateIncludedInMonth(date) {
    return (this.appointmentDates.findIndex(e => e.date == date) > -1) ? true : false;
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.appointmentTimes.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}

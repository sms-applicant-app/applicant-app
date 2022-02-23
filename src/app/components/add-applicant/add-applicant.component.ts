import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Applicant} from '../../models/applicant';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {ApplicantService} from '../../shared/applicant.service';
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import firebase from "firebase";

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddApplicantComponent implements OnInit {

  @Input() franchiseId: string;
  @Input() storeId: string;
  @Input() positionId: string;
  @Output() messageEvent = new EventEmitter<Applicant>();
  newApplicant: Applicant = new Applicant();
  applicantRegistered: boolean;
  registerForm: FormGroup;
  constructor(public dbHelper: FirestoreHelperService, public fb: FormBuilder, public authService: AuthService, public applicantService: ApplicantService) { }

  ngOnInit() {
    this.applicantRegistered = false;
    console.log('incoming position Id', this.positionId, this.storeId, this.franchiseId);
    this.initRegisterForm();
  }
  initRegisterForm(){
    this.registerForm = this.fb.group({
      email: [''],
      fullName: [''],
    });
  }
/*  saveApplicant(){
   const email = this.registerForm.controls.email.value;
   const password = this.registerForm.controls.password.value;
  this.authService.RegisterUser(email, password).then(send =>{
    this.authService.SendVerificationMail();
    this.addApplicantDetails();
    this.authService.SignIn(email, password).then(resp =>{
      console.log('logged in applicant ',resp);
    });
  });
  }*/
  saveApplicant(){
   this.newApplicant.name = this.registerForm.controls.name.value;
    //this.newApplicant.phoneNumber = this.registerForm.controls.phoneNumber.value;
    this.newApplicant.franchiseId = this.franchiseId;
    this.newApplicant.storeId = this.storeId;
   // this.newApplicant.addressId = this.registerForm.controls.zipCode.value;
    this.newApplicant.positionId = this.positionId;
    this.newApplicant.email = this.registerForm.controls.email.value;
    //this.newApplicant.franchiseId = this.franchiseId;
    this.newApplicant.status = 'Applied';
    console.log('applicant object', this.newApplicant);
    const id = this.newApplicant.email;
    this.applicantService.createApplicant(id, this.newApplicant).then(data =>{
      console.log('new applicant added', data);
      this.sendApplicantMessage();
    });
  }
  sendApplicantMessage(){
    this.messageEvent.emit(this.newApplicant);
  }


}

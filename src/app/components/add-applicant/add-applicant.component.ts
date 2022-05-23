import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Applicant} from '../../models/applicant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {ApplicantService} from '../../shared/applicant.service';
import {FirestoreHelperService} from '../../shared/firestore-helper.service';
import { emailValidator, matchingPasswords, phoneValidator } from 'src/app/shared/app.validator';

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
  messErr: string;
  messSuccess: string;
  constructor(
    public dbHelper: FirestoreHelperService,
    public fb: FormBuilder,
    public authService: AuthService,
    public applicantService: ApplicantService) { }

  ngOnInit() {
    this.applicantRegistered = false;
    console.log('incoming position Id', this.positionId, this.storeId, this.franchiseId);
    this.initRegisterForm();
  }
  initRegisterForm(){
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: ['', Validators.required],
        name: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneValidator]],
        zipCode: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );
  }
  registerApplicant(){
    if (this.registerForm.valid) {
      const email = this.registerForm.controls.email.value;
      const password = this.registerForm.controls.password.value;
      this.authService.RegisterUser(email, password).then(send =>{
        this.authService.SendVerificationMail();
        this.authService.SignIn(email, password).then(resp =>{
          console.log('logged in applicant ',resp);
          this.messErr = '';
          this.messSuccess = 'Register success';
        });
      }).catch(err => {
        this.messErr = err;
      });;
    } else {
      this.messErr = 'Please enter field required';
    }
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

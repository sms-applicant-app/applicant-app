import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Applicant } from '../../models/applicant';
let AddApplicantComponent = class AddApplicantComponent {
    constructor(dbHelper, fb, authService, applicantService) {
        this.dbHelper = dbHelper;
        this.fb = fb;
        this.authService = authService;
        this.applicantService = applicantService;
        this.messageEvent = new EventEmitter();
        this.newApplicant = new Applicant();
    }
    ngOnInit() {
        this.applicantRegistered = false;
        console.log('incoming position Id', this.positionId, this.storeId, this.franchiseId);
        this.initRegisterForm();
    }
    initRegisterForm() {
        this.registerForm = this.fb.group({
            email: [''],
            password: [''],
            name: [''],
            phoneNumber: [''],
            zipCode: ['']
        });
    }
    registerApplicant() {
        const email = this.registerForm.controls.email.value;
        const password = this.registerForm.controls.password.value;
        this.authService.RegisterUser(email, password).then(send => {
            this.authService.SendVerificationMail();
            this.addApplicantDetails();
            this.authService.SignIn(email, password).then(resp => {
                console.log('logged in applicant ', resp);
            });
        });
    }
    addApplicantDetails() {
        this.newApplicant.name = this.registerForm.controls.name.value;
        this.newApplicant.phoneNumber = this.registerForm.controls.phoneNumber.value;
        this.newApplicant.franchiseId = this.franchiseId;
        this.newApplicant.storeId = this.storeId;
        this.newApplicant.addressId = this.registerForm.controls.zipCode.value;
        this.newApplicant.positionId = this.positionId;
        this.newApplicant.email = this.registerForm.controls.email.value;
        this.newApplicant.franchiseId = this.franchiseId;
        console.log('applicant object', this.newApplicant);
        const id = this.newApplicant.email;
        this.applicantService.createApplicant(id, this.newApplicant).then(data => {
            console.log('new applicant added', data);
            this.sendApplicantMessage();
        });
    }
    sendApplicantMessage() {
        this.messageEvent.emit(this.newApplicant);
    }
};
__decorate([
    Input()
], AddApplicantComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], AddApplicantComponent.prototype, "storeId", void 0);
__decorate([
    Input()
], AddApplicantComponent.prototype, "positionId", void 0);
__decorate([
    Output()
], AddApplicantComponent.prototype, "messageEvent", void 0);
AddApplicantComponent = __decorate([
    Component({
        selector: 'app-add-applicant',
        templateUrl: './add-applicant.component.html',
        styleUrls: ['./add.component.scss'],
    })
], AddApplicantComponent);
export { AddApplicantComponent };
//# sourceMappingURL=add-applicant.component.js.map
import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ApplicantService = class ApplicantService {
    constructor(firestore, dbHelper) {
        this.firestore = firestore;
        this.dbHelper = dbHelper;
    }
    getApplicantsByFranchise(id) {
        return this.firestore.doc(`users/${id}`).valueChanges();
    }
    createApplicant(id, applicant) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicantObj = Object.assign({}, applicant);
            console.log('adding applicant', applicant);
            return this.firestore.collection('applicant').add(applicantObj).then(docRef => {
                const applicantId = docRef.id;
                localStorage.setItem('added-applicant', JSON.stringify(applicantId));
                console.log('added applicant id =', applicantId);
            });
        });
    }
    getApplicantsByStore(storeId) {
        return this.firestore.collection('applicants', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.applicantData = doc.data();
                });
            }
        });
    }
    createApplicantOnboardPacket(applicant) {
        return this.firestore.collection('applicant').add(`${applicant}`);
    }
    /*updateApplicant(applicant: Applicant){
      delete franchise.franchiseId;
      this.firestore.doc(`applicant/${id}`).update(applicant).then(resp =>{
        console.log('updated franchise', resp);
      });
    }*/
    deleteApplicant(applicantId) {
        this.firestore.doc(`franchisee/${applicantId}`).delete().then(resp => {
            console.log('deleting franchise', resp);
        });
    }
};
ApplicantService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApplicantService);
export { ApplicantService };
//# sourceMappingURL=applicant.service.js.map
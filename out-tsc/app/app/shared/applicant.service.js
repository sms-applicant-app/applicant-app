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
            return this.firestore.collection('applicant').doc(id).set(applicantObj).then(docRef => {
                const applicantId = docRef;
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
    updateApplicant(applicantId, data) {
        console.log('updated applicant', applicantId, data);
        this.firestore.doc(`applicant/${applicantId}`).update(data).then(resp => {
            console.log('updated applicant', applicantId, data);
        });
    }
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
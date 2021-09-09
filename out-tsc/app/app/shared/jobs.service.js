import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let JobsService = class JobsService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    getJobsByStore(storeId) {
        return this.firestore.collection('jobs', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.jobsData = doc.data();
                });
            }
        });
    }
    getPositionsById(id) {
        return this.firestore.doc(`jobs/${id}`).valueChanges();
    }
};
JobsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], JobsService);
export { JobsService };
//# sourceMappingURL=jobs.service.js.map
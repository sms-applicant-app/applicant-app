import { __decorate } from "tslib";
import { Component } from '@angular/core';
let Tab1Page = class Tab1Page {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    receiveApplicantMessage($event) {
        console.log('applicant added', $event);
        if ($event) {
            this.router.navigate(['tabs/tab2']);
        }
    }
};
Tab1Page = __decorate([
    Component({
        selector: 'app-tab1',
        templateUrl: 'tab1.page.html',
        styleUrls: ['tab1.page.scss']
    })
], Tab1Page);
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map
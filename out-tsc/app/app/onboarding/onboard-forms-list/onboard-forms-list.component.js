import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let OnboardFormsListComponent = class OnboardFormsListComponent {
    constructor() {
        this.federals = [
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
        this.states = [
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
        this.company = [
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
    }
    ngOnInit() { }
};
__decorate([
    Input()
], OnboardFormsListComponent.prototype, "federalDocs", void 0);
__decorate([
    Input()
], OnboardFormsListComponent.prototype, "stateDocs", void 0);
__decorate([
    Input()
], OnboardFormsListComponent.prototype, "companyDocs", void 0);
OnboardFormsListComponent = __decorate([
    Component({
        selector: 'app-onboard-forms-list',
        templateUrl: './onboard-forms-list.component.html',
        styleUrls: ['./onboard-forms-list.component.scss'],
    })
], OnboardFormsListComponent);
export { OnboardFormsListComponent };
//# sourceMappingURL=onboard-forms-list.component.js.map
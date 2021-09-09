import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2Page } from './tab2.page';
describe('Tab2Page', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [Tab2Page],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();
        fixture = TestBed.createComponent(Tab2Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tab2.page.spec.js.map
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PastEventsComponent } from './past-events.component';

let component: PastEventsComponent;
let fixture: ComponentFixture<PastEventsComponent>;

describe('pastEvents component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PastEventsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PastEventsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
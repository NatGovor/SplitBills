import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../../testing';
import { Bill, BILLS, FakeBillService } from '../../../../testing/fake-services/fake-bill.service';
import { USERS } from '../../../../testing/fake-data/fake-users';
import { GROUPS } from '../../../../testing/fake-data/fake-groups';

import { BillsComponent } from './bills.component';
import { BillService } from '../../services/bill.service';

import { Group } from '../../../../common/models/group';
import { PaidByPipe } from '../../../../common/pipes/paid-by.pipe';
import { HelpersService } from '../../../../common/services/helpers.service';
import { BillsRefreshInteraction } from '../../../services/bills-refresh-interaction.service';
import { Subject } from 'rxjs/Subject';

describe('BillsComponent', () => {
    let comp: BillsComponent;
    let fixture: ComponentFixture<BillsComponent>;
    let activatedRoute: ActivatedRouteStub;

    const expectedGroup = GROUPS[0];

    const firstUser = USERS[0];
    class HelpersStub {
        getUserFromStorage() {
            return firstUser;
        }
    }

    class BillsRefreshInteractionStub {
        private billRefreshedSource = new Subject<Bill>();

        billRefreshed$ = this.billRefreshedSource.asObservable();
    }

    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BillsComponent, PaidByPipe
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: HelpersService, useClass: HelpersStub },
                { provide: BillService, useClass: FakeBillService },
                { provide: BillsRefreshInteraction, useClass: BillsRefreshInteractionStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillsComponent);
        comp = fixture.componentInstance;

        comp.group = expectedGroup;

        fixture.detectChanges();
    });

    beforeEach(async(() => {
        fixture.detectChanges();
        fixture.whenStable()
            .then(() => fixture.detectChanges());
    }));

    it('should display bills for expected group', () => {
        const bills = fixture.debugElement.queryAll(By.css('table tr'));
        // for expected group should be 4 friends
        expect(bills.length).toBe(4);
    });
});

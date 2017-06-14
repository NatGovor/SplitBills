import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { click } from '../../../../../testing';
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

    const currentUser = USERS[0];
    class HelpersStub {
        getUserFromStorage() {
            return currentUser;
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

    it('should tell ROUTER to navigate for creating new Bill when "Add new" btn clicked',
        inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigate');

            const addBtn = fixture.debugElement.query(By.css('.add-btn'));
            click(addBtn);

            const navArgs = spy.calls.first().args[0];
            const infoObj = spy.calls.first().args[1];

            expect(infoObj.relativeTo).toBeDefined('should be relative path');
            expect(navArgs[0]).toBe('../bill/new', 'should nav to NewBillComponent');
            expect(navArgs[1]).toBeDefined('should pass the Object during navigation');
            expect(navArgs[1].groupId).toBe(comp.group.id, 'should pass the id of group to the NewBillComponent');
    }));

    it('should display "not involved" near the bill if the current user is not involved in the payment', () => {
        // first user is not involved in the last bill
        const bills = fixture.debugElement.queryAll(By.css('table tr'));
        const lastBill = bills[bills.length - 1];

        const subInfo = lastBill.query(By.css('td:nth-child(3)'));
        expect(subInfo.nativeElement.textContent).toContain('not involved');
    });

    it('should display the name of the payer or "you" if the payer is current user', () => {
        const bills = fixture.debugElement.queryAll(By.css('table tr'));
        for (let i = 0; i < comp.bills.length; i++) {
            const paidSubInfo = bills[i].query(By.css('td:nth-child(2) .sub-info'));
            const lentSubInfo = bills[i].query(By.css('td:nth-child(3) .sub-info'));
            if (comp.bills[i].paidBy === currentUser.id) {
                expect(paidSubInfo.nativeElement.textContent).toBe('you paid');
                expect(lentSubInfo.nativeElement.textContent).toBe('you lent');
            } else {
                expect(paidSubInfo.nativeElement.textContent).toBe(comp.friendsNames[comp.bills[i].paidBy] + ' paid');
                expect(lentSubInfo.nativeElement.textContent).toBe(comp.friendsNames[comp.bills[i].paidBy] + ' lent you');
            }
        }
    });
});

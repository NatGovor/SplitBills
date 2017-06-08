import { async, fakeAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

//import { click } from '../../../../../testing';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../../testing';

import { Component, Input, Directive } from '@angular/core';

import { GroupDetailComponent } from './group-detail.component';
import { GroupService } from '../../services/group.service';
import { BillsComponent } from '../../../bills/components/bills.component/bills.component';
import { Group } from '../../../../common/models/group';

let activatedRoute: ActivatedRouteStub;
let comp: GroupDetailComponent;
let fixture: ComponentFixture<GroupDetailComponent>;

@Component({selector: 'app-group-balances', template: ''})
class GroupBalancesStubComponent {
    @Input()
    group: Group;
}

@Component({selector: 'app-settle-up', template: ''})
class SettleUpStubComponent {
    @Input()
    group: Group;

    @Input()
    modal;
}

@Directive({
    selector: '[bsModal]',
    /*host: {
        '(click)': 'onClick()'
    }*/
})
export class ModalModuleStubDirective {
    /*@Input('routerLink') linkParams: any;
    navigateTo: any = null;

    onClick() {
        this.navigateTo = this.linkParams;
    }*/
}

describe('GroupDetail Component', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GroupDetailComponent, BillsComponent,
                GroupBalancesStubComponent,
                ModalModuleStubDirective, SettleUpStubComponent ],
            providers: [
                { provide: GroupService, useValue: {} },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: Router, useClass: RouterStub }
            ]
        })
        .compileComponents();
    }));

    /*beforeEach(async(() => {
        fixture = TestBed.createComponent(GroupDetailComponent);
        comp = fixture.componentInstance;
    }));

    beforeEach(async(() => {
        fixture.detectChanges();
        fixture.whenStable()
            .then(() => fixture.detectChanges());
    }));

     it('should have group', () => {
        expect(comp.group).toBeDefined();
    });*/
});

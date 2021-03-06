import { async, fakeAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { click } from '../../../../../testing';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../../testing';

import { FriendsComponent } from './friends.component';
import { FriendService } from '../../services/friend.service';
import { HelpersService } from '../../../../common/services/helpers.service';
import { User } from '../../../../common/models/user';

import { USERS } from '../../../../testing/fake-data/fake-users';
import { FakeFriendService } from '../../../../testing/fake-services/fake-friend.service';
import { HelpersStub } from '../../../../testing/fake-services/helpers-stub.service';

let activatedRoute: ActivatedRouteStub;
let comp: FriendsComponent;
let fixture: ComponentFixture<FriendsComponent>;

const expectedUser = USERS[0];

describe('Friends Component', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FriendsComponent ],
            providers: [
                { provide: HelpersService, useClass: HelpersStub },
                { provide: FriendService, useClass: FakeFriendService },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: Router, useClass: RouterStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendsComponent);
        comp = fixture.componentInstance;
    });

    beforeEach(async(() => {
        fixture.detectChanges();
        fixture.whenStable()
            .then(() => fixture.detectChanges());
    }));

    it('should display friends for user', () => {
        const friends = fixture.debugElement.queryAll(By.css('.items li'));
        // for expected user should be 3 friends
        expect(friends.length).toBe(3);
    });

    it('should tell ROUTER to navigate when friend is clicked',
        inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigate');

            const friendEl = fixture.debugElement.query(By.css('.items li'));
            click(friendEl);

            const navArgs = spy.calls.first().args[0];
            const infoObj = spy.calls.first().args[1];

            const id = comp.friends[0].userId;
            expect(infoObj.relativeTo).toBeDefined('should be relative path');
            expect(navArgs[0]).toBe(id, 'should nav to FriendDetail for first friend');
    }));
});

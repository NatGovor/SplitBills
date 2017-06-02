import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { HelpersService } from '../../../../common/services/helpers.service';

import { FakeUserService, USERS, User, UserService } from '../../../../common/services/testing/fake-user.service';

const firstUser = USERS[0];
class HelpersStub {
    getUserFromStorage() {
        return firstUser;
    }
}

let comp: ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;

describe('Profile Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfileComponent ],
            providers: [
                { provide: HelpersService, useClass: HelpersStub },
                { provide: UserService, useClass: FakeUserService }
            ]
        })
        .compileComponents().then(() => {
            fixture = TestBed.createComponent(ProfileComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should have h2 title "Profile"', () => {
        const h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
        expect(h2.textContent).toBe('Profile');
    });

    it('should not have user before ngOnInit', () => {
        expect(comp.user).not.toBeDefined();
    });

    describe('after user is received', () => {
        beforeEach(async(() => {
            fixture.detectChanges();
            fixture.whenStable()
                .then(() => fixture.detectChanges());
        }));

        it('should DISPLAY correct data for user', () => {
            const expectedUser = firstUser;

            const id = fixture.debugElement.query(By.css('div.id .value'));
            expect(id.nativeElement.textContent).toBe(expectedUser.id.toString(), 'correct id');

            const name = fixture.debugElement.query(By.css('div.name .value'));
            expect(name.nativeElement.textContent).toBe(expectedUser.name, 'correct name');

            const email = fixture.debugElement.query(By.css('div.email .value'));
            expect(email.nativeElement.textContent).toBe(expectedUser.email, 'correct email');
        });
    });
});

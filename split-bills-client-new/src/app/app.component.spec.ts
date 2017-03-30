import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { RouterLinkStubDirective } from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import { AuthService } from './unsecure-app/services/auth.service';
import { HistoryService } from './common/services/history.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

let historyService: HistoryService;
let historySpy: jasmine.Spy;

class RouterStub {
  public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigateByUrl(url: string) { return url; }
}

class AuthServiceSpy {
  isLoggedIn = false;

  login = jasmine.createSpy('login').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, true))
  );

  logout = jasmine.createSpy('logout').and.callFake(
    () => true
  );
}

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        HistoryService
      ]
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: AuthService, useClass: AuthServiceSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;

      historyService = fixture.debugElement.injector.get(HistoryService);

      historySpy = spyOn(historyService, 'addPage')
            .and.returnValue(null);

    });
  }));

  tests();
});

function tests() {

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it(`should have as title 'My Split bills'`, async(() => {
    const de = fixture.debugElement.query(By.css('h1'));
    const el = de.nativeElement;
    expect(el.textContent).toEqual('My Split bills');
  }));
}

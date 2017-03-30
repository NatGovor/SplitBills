import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { RouterLinkStubDirective } from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
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

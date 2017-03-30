import { async, ComponentFixture, fakeAsync,
inject, TestBed, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

//import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {
    ActivatedRoute, ActivatedRouteStub, Router, RouterStub
} from './testing/router-stubs';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService } from './hero-detail.service';
import { HeroModule } from './hero.module';

let activatedRoute: ActivatedRouteStub;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

describe('HeroDetailComponent', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });
    describe('when override its provided HeroDetailService', overrideSetup);
});

function overrideSetup() {
    class HeroDetailServiceSpy {
        testHero = new Hero(42, 'Test Hero');

        getHero = jasmine.createSpy('getHero').and.callFake(
            () => Promise
                .resolve(true)
                .then(() => Object.assign({}, this.testHero))
        );

        saveHero = jasmine.createSpy('saveHero').and.callFake(
            (hero: Hero) => Promise
                .resolve(true)
                .then(() => Object.assign(this.testHero, hero))
        );
    }

    beforeEach(() => activatedRoute.testParams = { id: 99999 } );

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HeroModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: Router, useClass: RouterStub },
                { provide: HeroDetailService, useValue: {} }
            ]
        })
        .overrideComponent(HeroDetailComponent, {
            set: {
                providers: [
                    { provide: HeroDetailService, useClass: HeroDetailServiceSpy }
                ]
            }
        })
        .compileComponents();
    }));

    let hdsSpy;

    beforeEach( async(() => {
        createComponent();
        hdsSpy = fixture.debugElement.injector.get(HeroDetailService);
    }));

    it('should have called `getHero`', () => {
        expect(hdsSpy.getHero.calls.count()).toBe(1, 'getHero called once');
    });

    it('should display stub hero\'s name', () => {
        expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
    })
}

function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;

  saveBtn:      DebugElement;
  cancelBtn:    DebugElement;
  nameDisplay:  HTMLElement;
  nameInput:    HTMLInputElement;

  constructor() {
    const router = TestBed.get(Router); // get router from root injector
    this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
    this.navSpy  = spyOn(router, 'navigate');
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (comp.hero) {
      // have a hero so these elements are now in the DOM
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      this.saveBtn     = buttons[0];
      this.cancelBtn   = buttons[1];
      this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
      this.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
    }
  }
}

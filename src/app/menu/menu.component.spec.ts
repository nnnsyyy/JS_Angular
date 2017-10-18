import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs/Observable';

import { MenuComponent } from './menu.component';

// specify a set of Jasmine testing cases running on 'MenuComponent'
// can also use string to specify what to do
// () => {} error function
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  // within this js object, just keep testing method
  let dishServiceStub = {
    getDishes: function(): Observable<Dish[]> {
      return Observable.of(DISHES);
    }
  };

  // beforeEach: actions before each testing (it)
  // async: compileComponents requires some preparation time
  // and async is used to wait for it.
  beforeEach(async(() => {
    // TestBed: allow to set up env within which can test specific component
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])
      ],
      declarations: [ MenuComponent ],
      providers: [
      // for testing, instead of real service, use a stub
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
      ]
    }) // function: compile MenuComponent and make it ready for testing
    .compileComponents();

    let dishservice = TestBed.get(DishService);
  }));

  // second part:
  beforeEach(() => {
    // create ref of component
    fixture = TestBed.createComponent(MenuComponent);
    // a specific instance
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1st test: component has been created
  it('should create', () => {
    // expect(value).satisfying_sth
    expect(component).toBeTruthy();
  });
  // 2nd test: check content of dishes
  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });
  // 3rd test: check DOM
  it('should use dishes in the template', () => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    // By: access element of FOM
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());

  });
});

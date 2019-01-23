import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatspageComponent } from './statspage.component';

describe('StatspageComponent', () => {
  let component: StatspageComponent;
  let fixture: ComponentFixture<StatspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

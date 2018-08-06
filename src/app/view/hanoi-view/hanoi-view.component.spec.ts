import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanoiViewComponent } from './hanoi-view.component';

describe('HanoiViewComponent', () => {
  let component: HanoiViewComponent;
  let fixture: ComponentFixture<HanoiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanoiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanoiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

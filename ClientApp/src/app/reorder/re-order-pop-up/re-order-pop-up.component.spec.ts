import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReOrderPopUpComponent } from './re-order-pop-up.component';

describe('ReOrderPopUpComponent', () => {
  let component: ReOrderPopUpComponent;
  let fixture: ComponentFixture<ReOrderPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReOrderPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageReportComponent } from './luggage-report.component';

describe('LuggageReportComponent', () => {
  let component: LuggageReportComponent;
  let fixture: ComponentFixture<LuggageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggageReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuggageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

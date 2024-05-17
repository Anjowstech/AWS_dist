import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceAPILogInComponent } from './face-apilog-in.component';

describe('FaceAPILogInComponent', () => {
  let component: FaceAPILogInComponent;
  let fixture: ComponentFixture<FaceAPILogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceAPILogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceAPILogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

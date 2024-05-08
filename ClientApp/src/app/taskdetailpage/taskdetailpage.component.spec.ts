import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdetailpageComponent } from './taskdetailpage.component';

describe('TaskdetailpageComponent', () => {
  let component: TaskdetailpageComponent;
  let fixture: ComponentFixture<TaskdetailpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskdetailpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

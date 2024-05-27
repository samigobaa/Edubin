import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPanelComponent } from './teachers-panel.component';

describe('TeachersPanelComponent', () => {
  let component: TeachersPanelComponent;
  let fixture: ComponentFixture<TeachersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

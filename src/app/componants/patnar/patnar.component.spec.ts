import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnarComponent } from './patnar.component';

describe('PatnarComponent', () => {
  let component: PatnarComponent;
  let fixture: ComponentFixture<PatnarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatnarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatnarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

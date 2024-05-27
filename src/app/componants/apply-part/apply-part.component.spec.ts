import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPartComponent } from './apply-part.component';

describe('ApplyPartComponent', () => {
  let component: ApplyPartComponent;
  let fixture: ComponentFixture<ApplyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiProfileComponent } from './admi-profile.component';

describe('AdmiProfileComponent', () => {
  let component: AdmiProfileComponent;
  let fixture: ComponentFixture<AdmiProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

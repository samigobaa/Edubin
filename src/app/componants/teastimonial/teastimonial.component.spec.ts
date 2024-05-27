import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeastimonialComponent } from './teastimonial.component';

describe('TeastimonialComponent', () => {
  let component: TeastimonialComponent;
  let fixture: ComponentFixture<TeastimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeastimonialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeastimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

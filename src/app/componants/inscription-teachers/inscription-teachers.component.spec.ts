import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionTeachersComponent } from './inscription-teachers.component';

describe('InscriptionTeachersComponent', () => {
  let component: InscriptionTeachersComponent;
  let fixture: ComponentFixture<InscriptionTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

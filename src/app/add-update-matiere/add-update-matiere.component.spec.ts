import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMatiereComponent } from './add-update-matiere.component';

describe('AddUpdateMatiereComponent', () => {
  let component: AddUpdateMatiereComponent;
  let fixture: ComponentFixture<AddUpdateMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateMatiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

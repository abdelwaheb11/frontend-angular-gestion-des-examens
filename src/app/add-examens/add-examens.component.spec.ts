import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamensComponent } from './add-examens.component';

describe('AddExamensComponent', () => {
  let component: AddExamensComponent;
  let fixture: ComponentFixture<AddExamensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

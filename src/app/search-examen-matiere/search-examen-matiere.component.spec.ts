import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExamenMatiereComponent } from './search-examen-matiere.component';

describe('SearchExamenMatiereComponent', () => {
  let component: SearchExamenMatiereComponent;
  let fixture: ComponentFixture<SearchExamenMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchExamenMatiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchExamenMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExamenEtudiantComponent } from './search-examen-etudiant.component';

describe('SearchExamenEtudiantComponent', () => {
  let component: SearchExamenEtudiantComponent;
  let fixture: ComponentFixture<SearchExamenEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchExamenEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchExamenEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutCardComponent } from './produt-card.component';

describe('ProdutCardComponent', () => {
  let component: ProdutCardComponent;
  let fixture: ComponentFixture<ProdutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

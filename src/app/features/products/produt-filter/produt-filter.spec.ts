import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutFilter } from './produt-filter';

describe('ProdutFilter', () => {
  let component: ProdutFilter;
  let fixture: ComponentFixture<ProdutFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

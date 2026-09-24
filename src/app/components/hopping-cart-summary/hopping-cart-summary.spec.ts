import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoppingCartSummary } from './hopping-cart-summary';

describe('HoppingCartSummary', () => {
  let component: HoppingCartSummary;
  let fixture: ComponentFixture<HoppingCartSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoppingCartSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(HoppingCartSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

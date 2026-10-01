import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutListComponent } from './produt-list.component';

describe('ProdutListComponent', () => {
  let component: ProdutListComponent;
  let fixture: ComponentFixture<ProdutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

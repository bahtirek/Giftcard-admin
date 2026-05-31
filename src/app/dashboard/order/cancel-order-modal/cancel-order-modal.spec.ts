import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderModal } from './cancel-order-modal';

describe('CancelOrderModal', () => {
  let component: CancelOrderModal;
  let fixture: ComponentFixture<CancelOrderModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelOrderModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelOrderModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

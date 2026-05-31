import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGiftcardModal } from './new-giftcard-modal';

describe('NewGiftcardModal', () => {
  let component: NewGiftcardModal;
  let fixture: ComponentFixture<NewGiftcardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGiftcardModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NewGiftcardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

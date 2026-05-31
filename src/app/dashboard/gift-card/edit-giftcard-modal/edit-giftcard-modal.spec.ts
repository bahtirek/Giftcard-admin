import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGiftcardModal } from './edit-giftcard-modal';

describe('EditGiftcardModal', () => {
  let component: EditGiftcardModal;
  let fixture: ComponentFixture<EditGiftcardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGiftcardModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGiftcardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

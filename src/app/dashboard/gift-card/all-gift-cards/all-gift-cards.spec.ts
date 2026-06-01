import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGiftCards } from './all-gift-cards';

describe('AllGiftCards', () => {
  let component: AllGiftCards;
  let fixture: ComponentFixture<AllGiftCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGiftCards],
    }).compileComponents();

    fixture = TestBed.createComponent(AllGiftCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

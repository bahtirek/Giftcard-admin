import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountModal } from './new-account-modal';

describe('NewAccountModal', () => {
  let component: NewAccountModal;
  let fixture: ComponentFixture<NewAccountModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAccountModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccountModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

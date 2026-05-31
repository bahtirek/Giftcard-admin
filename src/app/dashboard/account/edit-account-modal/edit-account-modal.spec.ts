import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountModal } from './edit-account-modal';

describe('EditAccountModal', () => {
  let component: EditAccountModal;
  let fixture: ComponentFixture<EditAccountModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccountModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAccountModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessType } from './business-type';

describe('BusinessType', () => {
  let component: BusinessType;
  let fixture: ComponentFixture<BusinessType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessType],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCard } from './coupon-card';

describe('CouponCard', () => {
  let component: CouponCard;
  let fixture: ComponentFixture<CouponCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

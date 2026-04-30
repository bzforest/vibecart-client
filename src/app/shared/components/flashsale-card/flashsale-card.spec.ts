import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashsaleCard } from './flashsale-card';

describe('FlashsaleCard', () => {
  let component: FlashsaleCard;
  let fixture: ComponentFixture<FlashsaleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashsaleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashsaleCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

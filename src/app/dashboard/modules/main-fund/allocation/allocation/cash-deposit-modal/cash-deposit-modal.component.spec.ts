import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDepositModalComponent } from './cash-deposit-modal.component';

describe('CashDepositModalComponent', () => {
  let component: CashDepositModalComponent;
  let fixture: ComponentFixture<CashDepositModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashDepositModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashDepositModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

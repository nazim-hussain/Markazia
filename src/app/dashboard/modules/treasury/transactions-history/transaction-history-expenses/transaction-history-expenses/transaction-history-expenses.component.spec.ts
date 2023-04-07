import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryExpensesComponent } from './transaction-history-expenses.component';

describe('TransactionHistoryExpensesComponent', () => {
  let component: TransactionHistoryExpensesComponent;
  let fixture: ComponentFixture<TransactionHistoryExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

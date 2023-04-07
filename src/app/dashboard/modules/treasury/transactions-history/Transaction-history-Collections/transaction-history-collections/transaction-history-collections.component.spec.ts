import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryCollectionsComponent } from './transaction-history-collections.component';

describe('TransactionHistoryCollectionsComponent', () => {
  let component: TransactionHistoryCollectionsComponent;
  let fixture: ComponentFixture<TransactionHistoryCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

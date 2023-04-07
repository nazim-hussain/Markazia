import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfirmComponent } from './expense-confirm.component';

describe('ExpenseConfirmComponent', () => {
  let component: ExpenseConfirmComponent;
  let fixture: ComponentFixture<ExpenseConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

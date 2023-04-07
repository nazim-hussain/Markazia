import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastExpenseComponent } from './last-expense.component';

describe('LastExpenseComponent', () => {
  let component: LastExpenseComponent;
  let fixture: ComponentFixture<LastExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

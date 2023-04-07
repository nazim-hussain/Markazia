import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideExpensesModalComponent } from './provide-expenses-modal.component';

describe('ProvideExpensesModalComponent', () => {
  let component: ProvideExpensesModalComponent;
  let fixture: ComponentFixture<ProvideExpensesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideExpensesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideExpensesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

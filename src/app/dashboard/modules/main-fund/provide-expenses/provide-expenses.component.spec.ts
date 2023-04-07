import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideExpensesComponent } from './provide-expenses.component';

describe('ProvideExpensesComponent', () => {
  let component: ProvideExpensesComponent;
  let fixture: ComponentFixture<ProvideExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

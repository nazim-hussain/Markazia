import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpenseDetailsComponent } from './modal-expense-details.component';

describe('ModalExpenseDetailsComponent', () => {
  let component: ModalExpenseDetailsComponent;
  let fixture: ComponentFixture<ModalExpenseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExpenseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

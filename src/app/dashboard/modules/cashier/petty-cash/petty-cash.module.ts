import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { PettyCashComponent } from './petty-cash.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddPettyCashComponent } from './add-petty-cash/add-petty-cash.component';
import { ExpenseConfirmComponent } from './expense-confirm/expense-confirm.component';
import { ModalImageComponent } from './modal-image/modal-image.component';

import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddRequestComponent } from './requests/add-request/add-request.component';
import { LastExpenseComponent } from './last-expense/last-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    PettyCashComponent,
    AddPettyCashComponent,
    ExpenseConfirmComponent,
    ModalImageComponent,
    ExpenseComponent,
    RequestsComponent,
    LastExpenseComponent,
    AddExpenseComponent,
    AddRequestComponent,
  ],
  imports: [CommonModule, PettyCashRoutingModule, SharedModule],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PettyCashModule {}

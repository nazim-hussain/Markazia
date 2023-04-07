import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashTreasuryRoutingModule } from './petty-cash-treasury-routing.module';
import { PettyCashTreasuryComponent } from './petty-cash-treasury.component';
import { RequestComponent } from './components/request/request.component';
import { SetupComponent } from './components/setup/setup.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { LastExpenseComponent } from './components/last-expense/last-expense.component';
import { ModalApproveComponent } from './components/modal-approve/modal-approve.component';
import { ModalExpenseDetailsComponent } from './components/modal-expense-details/modal-expense-details.component';
import { CategoryComponent } from './components/category/category/category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { ModalEditSetupComponent } from './components/setup/modal-edit-setup/modal-edit-setup.component';

@NgModule({
  declarations: [
    PettyCashTreasuryComponent,
    RequestComponent,
    SetupComponent,
    RequestDetailsComponent,
    LastExpenseComponent,
    ModalApproveComponent,
    ModalExpenseDetailsComponent,
    CategoryComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    ModalEditSetupComponent,
  ],
  imports: [CommonModule, PettyCashTreasuryRoutingModule, SharedModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class PettyCashTreasuryModule {}

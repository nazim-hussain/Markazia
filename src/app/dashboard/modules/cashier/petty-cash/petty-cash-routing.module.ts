import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPettyCashComponent } from './add-petty-cash/add-petty-cash.component';
import { ExpenseComponent } from './expense/expense.component';
import { PettyCashComponent } from './petty-cash.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  { path: '', component: PettyCashComponent },
  { path: 'add-petty-cash', component: AddPettyCashComponent },
  { path: 'view-expense/:id', component: AddPettyCashComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'requests', component: RequestsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PettyCashRoutingModule {}

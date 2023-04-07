import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { ViewDirectPaymentsComponent } from './Transaction-history-Collections/transaction-history-collections/direct-payments/view-direct-payments/view-direct-payments.component';

const routes: Routes = [
  { path: '', component: TransactionsHistoryComponent },
  { path: 'view-direct-payment/:id', component: ViewDirectPaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsHistoryRoutingModule {}

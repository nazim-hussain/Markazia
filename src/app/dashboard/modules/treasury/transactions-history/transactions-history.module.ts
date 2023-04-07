import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionHistoryModalComponent } from './transaction-history-modal/transaction-history-modal.component';
import { HistoryModalImageComponent } from './history-modal-image/history-modal-image.component';
import { TransactionHistoryCollectionsComponent } from './Transaction-history-Collections/transaction-history-collections/transaction-history-collections.component';
import { TransactionHistoryExpensesComponent } from './transaction-history-expenses/transaction-history-expenses/transaction-history-expenses.component';
import { DirectPaymentsComponent } from './Transaction-history-Collections/transaction-history-collections/direct-payments/direct-payments.component';
import { ViewDirectPaymentsComponent } from './Transaction-history-Collections/transaction-history-collections/direct-payments/view-direct-payments/view-direct-payments.component';

@NgModule({
  declarations: [
    TransactionsHistoryComponent,
    TransactionHistoryModalComponent,
    HistoryModalImageComponent,
    TransactionHistoryCollectionsComponent,
    TransactionHistoryExpensesComponent,
    DirectPaymentsComponent,
    ViewDirectPaymentsComponent,
  ],
  imports: [CommonModule, TransactionsHistoryRoutingModule, SharedModule],
})
export class TransactionsHistoryModule {}

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { ProvideExpensesService } from '../../main-fund/provide-expenses/provide-expense-service/provide-expenses.service';
import { ProvideExpensesModalComponent } from '../../main-fund/provide-expenses/provide-expenses-modal/provide-expenses-modal/provide-expenses-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionHistoryModalComponent } from './transaction-history-modal/transaction-history-modal.component';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent {
  selected: number = 1;
  goToPage(value) {
    this.selected = value;
  }
}

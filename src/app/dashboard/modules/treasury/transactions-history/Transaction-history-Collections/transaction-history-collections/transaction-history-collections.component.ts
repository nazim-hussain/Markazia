import { Component } from '@angular/core';
import { TransactionHistoryService } from '../../transaction-history-services/transaction-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvideExpensesModalComponent } from 'src/app/dashboard/modules/main-fund/provide-expenses/provide-expenses-modal/provide-expenses-modal/provide-expenses-modal.component';
import * as _ from 'underscore';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-transaction-history-collections',
  templateUrl: './transaction-history-collections.component.html',
  styleUrls: ['./transaction-history-collections.component.scss'],
})
export class TransactionHistoryCollectionsComponent {
  selected: number = 1;
  collectedAmount: any;

  constructor(
    private TransactionHistoryService: TransactionHistoryService,
    private modalService: NgbModal,
    public headerService: HeaderService
  ) {
    ////
  }

  ngOnInit(): void {
    this.getCollectedAmount();

    this.headerService.setTitle(
      'Transactions History > Direct Payment Collection'
    );
  }

  goToPage(value) {
    this.selected = value;
    if (value == 1) {
      this.headerService.setTitle(
        'Transactions History > Direct Payment Collection'
      );
    } else if (value == 2) {
      this.headerService.setTitle('Transactions History > Service Center');
    } else if (value == 3) {
      this.headerService.setTitle('Transactions History > Spare Parts');
    }
  }

  /**
   * get Collected Amount
   */

  getCollectedAmount() {
    this.TransactionHistoryService.getCollectedAmount().subscribe(
      (response) => {
        if (response.isSuccess == true) {
          this.collectedAmount = response?.data;
          console.log(response, 'collected Amount');
        }
      }
    );
  }
}

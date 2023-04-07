import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CashDepositModalComponent } from 'src/app/dashboard/modules/main-fund/allocation/allocation/cash-deposit-modal/cash-deposit-modal.component';
import * as _ from 'underscore';
import { TransactionHistoryService } from '../../../../transaction-history-services/transaction-history.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-view-direct-payments',
  templateUrl: './view-direct-payments.component.html',
  styleUrls: ['./view-direct-payments.component.scss'],
})
export class ViewDirectPaymentsComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  provideExpenses: any;
  viewDetailsDirectPayment: any;
  collectionsPayment: any[] = [];

  search: string;
  nameInitials: any;
  newName: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private TransactionHistoryService: TransactionHistoryService,
    private modalService: NgbModal,
    public headerService: HeaderService
  ) {}
  collectionId: string;
  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    this.getDirectPaymentDetails(this.collectionId);
    this.headerService.setTitle(
      'Transactions History > Direct Payment Collection > View Collection Details'
    );
  }

  /**
   * get view details allocation
   */
  getDirectPaymentDetails(collectionId) {
    this.TransactionHistoryService.getDirectPaymentDetails(
      collectionId
    ).subscribe((response) => {
      console.log(response, 'view details');

      if (response.isSuccess == true) {
        this.viewDetailsDirectPayment = response.data;
        this.collectionsPayment = response.data.collections;
        this.totalRecords = response?.info?.totalRecordsCount;

        this.nameInitials =
          this.viewDetailsDirectPayment?.customer?.customerName;
        this.newName = this.nameInitials.split(' ');
        console.log(this.newName, 'name');
      }
    });
  }
}

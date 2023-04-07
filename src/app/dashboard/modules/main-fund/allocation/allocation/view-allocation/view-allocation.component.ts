import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { AllocationService } from '../allocation-services/allocation.service';
import { CashDepositModalComponent } from '../cash-deposit-modal/cash-deposit-modal.component';

@Component({
  selector: 'app-view-allocation',
  templateUrl: './view-allocation.component.html',
  styleUrls: ['./view-allocation.component.scss'],
})
export class ViewAllocationComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  provideExpenses: any;
  viewDetailsAllocationOrder: any;
  viewDetailsAllocationOrderList: any[] = [];

  search: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private _allocationService: AllocationService,
    private modalService: NgbModal
  ) {}
  orderId: string;
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log(this.orderId, 'orderId');
    if (this.orderId) {
      this.getViewDetailsOrderAllocation(this.orderId);
    }
  }

  /**
   * get view details allocation
   */
  getViewDetailsOrderAllocation(orderId) {
    this._allocationService
      .getViewDetailAllocation(orderId)
      .subscribe((response) => {
        console.log(response, 'view details');

        if (response.isSuccess == true) {
          this.viewDetailsAllocationOrder = response.data;
          this.viewDetailsAllocationOrderList =
            response.data.mainFundAlocationOrderDetails;
          this.totalRecords = response?.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          console.log(this.pagin);
          console.log(this.pages);
        }
      });
  }
  /**
   * resetting search input field
   */
  removeSearch() {
    this.searchText = '';
  }

  // Sorting Functions
  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
  }
  sortByDate() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
  }
  sortByCashier() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
  }
  sortByAmount() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
  }

  /**
   * on click deposite button
   */

  depositAmount(item) {
    console.log(item, 'item');
    if (item?.accountTypeId === 15001) {
      //open modal
      const modalRef = this.modalService.open(CashDepositModalComponent, {
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.depositAmount = item;
      modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
        console.log('resendtoLoadDatasult', result);
        this.modalService.dismissAll();
      });
    } else if (item?.accountTypeId === 15002 || 15003) {
      //open screen
      this.router.navigateByUrl('/mainFund-allocation/desposit-cheque');
      this._allocationService.despositeAmount.next(item);
    }
  }

  /**
   * veiw deposit amount
   *
   */
  viewDepositAAmount(item) {
    if (item?.accountTypeId === 15001) {
      //open modal
      const modalRef = this.modalService.open(CashDepositModalComponent, {
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.viewDepositAmount = item;
      modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
        console.log('resendtoLoadDatasult', result);
        this.modalService.dismissAll();
      });
    } else if (item?.accountTypeId === 15002 || 15003) {
      //open screen
      this.router.navigateByUrl('/mainFund-allocation/desposit-cheque');
      this._allocationService._viewDepositAmount.next(item);
    }
  }
}

// {
//   backdrop: 'static',
//   keyboard: false,
// }

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { ProvideExpensesService } from './provide-expense-service/provide-expenses.service';
import { ProvideExpensesModalComponent } from './provide-expenses-modal/provide-expenses-modal/provide-expenses-modal.component';

@Component({
  selector: 'app-provide-expenses',
  templateUrl: './provide-expenses.component.html',
  styleUrls: ['./provide-expenses.component.scss'],
})
export class ProvideExpensesComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number = 18;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  provideExpenses: any;

  search: string;

  constructor(
    private modalService: NgbModal,
    private _provideExpensesService: ProvideExpensesService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  /**
   * get List of provide expenses
   */
  getList() {
    this._provideExpensesService
      .getProvideExpenses(this.searchText, this.sort, this.pageNo)
      .subscribe((response) => {
        console.log(response, 'res');
        if (response) {
          this.provideExpenses = response?.data;
          this.totalRecords = response?.totalRecordCount;
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
    this.sort = 1;
    this.getList();
  }

  // Sorting Functions
  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getList();
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getList();
  }
  sortByDate() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.getList();
  }
  sortByCashier() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.getList();
  }
  sortByAmount() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
    this.getList();
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
    this.getList();
  }

  /**
   * search box - get data according to the search
   */
  searchExpenses(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.getList();
    }
    if (text.length == 0) {
      this.getList();
    }
  }
  /**
   * modal pop-up
   */
  openModalTrigger(item) {
    const modalRef = this.modalService.open(ProvideExpensesModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.registerDetails = item;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.getList();
    });
  }
}

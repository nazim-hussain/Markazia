import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { HeaderService } from '../../../../../services/header.service';
import { AddPettyCashComponent } from '../add-petty-cash/add-petty-cash.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';
import { PettyCashService } from '../services/petty-cash.service';

@Component({
  selector: 'app-last-expense',
  templateUrl: './last-expense.component.html',
  styleUrls: ['./last-expense.component.scss'],
})
export class LastExpenseComponent implements OnInit {
  expenses!: any[];
  totalRecords!: number;
  totalPages!: number;
  items = [1, 2, 1, 2, 1, 2];

  searchText: string = '';
  sort: number = 1;

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];

  constructor(
    private pettyCashService: PettyCashService,
    public headerService: HeaderService,
    private modalService: NgbModal,
    private router: Router,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.GetExpenses();
  }
  addRole() {
    this.router.navigateByUrl('/petty-cash/add-petty-cash');
    this.headerService.setTitle('Petty Cash > Add Petty Cash');
  }
  viewExpense() {
    this.headerService.setTitle('petty-cash > View role');
  }
  openModalExpense() {
    const modalRef = this.modalService.open(AddPettyCashComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.name = '';
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('result', result);
      this.modalService.dismissAll();
      this.GetExpenses();
    });
  }

  openModalExpenseView(item) {
    const modalRef = this.modalService.open(AddPettyCashComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.expenseId = item.expenseRecordId;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetExpenses();
    });
  }
  GetExpenses() {
    return this.pettyCashService
      .GetExpenses(this.searchText, this.sort, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.expenses = response.data;
          this.totalRecords = response.info.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          console.log(this.pagin);
          console.log(this.pages);
        }
      });
  }
  searchRoles(event: any) {
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.GetExpenses();
    }
    if (text.length == 0) {
      this.GetExpenses();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.GetExpenses();
  }

  sortByInvoice() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.GetExpenses();
  }
  sortByCategory() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.GetExpenses();
  }
  sortByIDate() {
    if (this.sort != 12) {
      this.sort = 12;
    } else {
      this.sort = this.sort == 12 ? 1 : 12;
    }
    this.GetExpenses();
  }
  sortByTax() {
    if (this.sort == 8) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 7 ? 8 : 7;
    }
    this.GetExpenses();
  }

  sortByAmount() {
    if (this.sort == 10) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 9 ? 10 : 9;
    }
    this.GetExpenses();
  }
  setPage(page: number) {
    this.pageNo = page;
    this.GetExpenses();
    window.scroll(0, 0);
  }

  openMdalImage(item) {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.expenseDetails = item;
  }
}

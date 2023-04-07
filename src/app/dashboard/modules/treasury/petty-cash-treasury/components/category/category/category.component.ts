import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { HeaderService } from '../../../../../../../services/header.service';
import { AddPettyCashComponent } from '../../../../../cashier/petty-cash/add-petty-cash/add-petty-cash.component';
import { ModalImageComponent } from '../../../../../cashier/petty-cash/modal-image/modal-image.component';
import { PettyCashService } from '../../../../../cashier/petty-cash/services/petty-cash.service';
import { TreasuryService } from '../../../services/treasury.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  expenses!: any[];
  totalRecords!: number;
  totalPages!: number;
  items = [1, 2, 1, 2, 1, 2];

  searchText: string = '';
  sort: number = 0;

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];

  constructor(
    private treasuryService: TreasuryService,
    public headerService: HeaderService,
    private modalService: NgbModal,
    private router: Router,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.GetExpensesCategories();
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
      this.GetExpensesCategories();
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
      this.GetExpensesCategories();
    });
  }
  GetExpensesCategories() {
    if(this.isDeleted){
      this.sort = 0;
      this.pageNo = 0;
      this.isDeleted = false;
    }
    return this.treasuryService
      .GetExpensesCategories(this.sort, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          // if(response.data.length == 0)
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
      this.GetExpensesCategories();
    }
    if (text.length == 0) {
      this.GetExpensesCategories();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.GetExpensesCategories();
  }

  sortByInvoice() {
    if (this.sort == 2) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 1 ? 2 : 1;
    }
    this.GetExpensesCategories();
  }
  sortByCategory() {
    if (this.sort == 4) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 3 ? 4 : 3;
    }
    this.GetExpensesCategories();
  }
  sortByIDate() {
    if (this.sort == 6) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 5 ? 6 : 5;
    }
    this.GetExpensesCategories();
  }
  sortByTax() {
    if (this.sort == 8) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 7 ? 8 : 7;
    }
    this.GetExpensesCategories();
  }

  sortByAmount() {
    if (this.sort == 10) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 9 ? 10 : 9;
    }
    this.GetExpensesCategories();
  }
  setPage(page: number) {
    this.pageNo = page;
    this.GetExpensesCategories();
  }

  openMdalImage(item) {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.expenseDetails = item;
  }

  openModalAdd() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.expenseDetails = 'item';
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetExpensesCategories();
    });
  }
  openModalEdit(item) {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.expenseDetails = item;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetExpensesCategories();
    });
  }
  isDeleted: boolean;
  openModalDelete(item) {
    
    const modalRef = this.modalService.open(DeleteCategoryComponent);
    modalRef.componentInstance.expenseDetails = item;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.isDeleted = true;
      this.GetExpensesCategories();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { HeaderService } from '../../../../../../services/header.service';
import { ModalImageComponent } from '../../../../cashier/petty-cash/modal-image/modal-image.component';
import { AddRequestComponent } from '../../../../cashier/petty-cash/requests/add-request/add-request.component';
import { TreasuryService } from '../../services/treasury.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  expenses!: any[];
  totalRecords!: number;
  totalPages!: number;
  items = [1, 2, 1, 2, 1, 2];

  searchText: string = '';
  status: string = '';
  sort: number = 1;

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
    // this.headerService.setTitle('Petty Cash > Petty Cash Request');

    // this.GetRegisterPettyCashRequestLast();
    this.GetRegisterPettycashrequest();

    this.treasuryService.pettyCashRequest$.subscribe(response => {
      if(response == 'PettyCashRequest')
          this.GetRegisterPettycashrequest();
    })
  }

  Viewdetails(item) {
    this.router.navigateByUrl('/petty-cash/request-details/1');
    this.headerService.setTitle(
      'Petty Cash > Petty Cash Request > View Details'
    );
  }
  viewExpense() {
    this.headerService.setTitle('petty-cash > View role');
  }

  LastRequest: any;
  GetRegisterPettyCashRequestLast() {
    return this.treasuryService
      .GetRegisterPettyCashRequestLast()
      .subscribe((response: any) => {
        if (response) {
          this.LastRequest = response.data;
        }
      });
  }

  GetRegisterPettycashrequest() {
    return this.treasuryService
      .GetRegisterPettycashrequest(
        this.searchText,
        this.sort,
        this.status,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.expenses = response.data;
          this.totalRecords = response.info.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          console.log(this.pagin);
          console.log(this.pages);
          //   this.pager.EventsCount = response["TotalCount"];
          // this.pager.setPage(this.pager.GlobalPageIndex, false);
        }
      });
  }
  searchTable(event: any) {
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.GetRegisterPettycashrequest();
    }
    if (text.length == 0) {
      this.GetRegisterPettycashrequest();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.GetRegisterPettycashrequest();
  }

  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.GetRegisterPettycashrequest();
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.GetRegisterPettycashrequest();
  }
  sortByRegisterName() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.GetRegisterPettycashrequest();
  }

  sortByDate() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.GetRegisterPettycashrequest();
  }

  sortByRequestBy() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
    this.GetRegisterPettycashrequest();
  }

  sortByStatus() {
    if (this.sort == 13) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 12 ? 13 : 12;
    }
    this.GetRegisterPettycashrequest();
  }
  setPage(page: number) {
    this.pageNo = page;
    this.GetRegisterPettycashrequest();
    window.scroll(0, 0);
  }

  openMdalImage(item) {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.expenseDetails = item;
  }

  openModalAddREquest() {
    const modalRef = this.modalService.open(AddRequestComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.type = 'add';
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('result', result);
      this.modalService.dismissAll();
      this.GetRegisterPettycashrequest();
    });
  }

  openModalExpenseView(item) {
    const modalRef = this.modalService.open(AddRequestComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.type = 'view';
    modalRef.componentInstance.pettyCashRequestId = item.pettyCashRequestId;
  }
}

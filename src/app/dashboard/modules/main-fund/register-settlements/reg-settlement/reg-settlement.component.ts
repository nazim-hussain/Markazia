import { Component } from '@angular/core';
import { RegisterSettlementService } from '../register-settlements-service/register-settlement.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-reg-settlement',
  templateUrl: './reg-settlement.component.html',
  styleUrls: ['./reg-settlement.component.scss']
})
export class RegSettlementComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number = 0;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  sessionList:any[] = [];
  constructor(private _registerSettlementService: RegisterSettlementService) {

  }
  ngOnInit() {
    this.getAllSessions()
  }
  getAllSessions() {
    this._registerSettlementService.getAllSessions(this.pageNo, '',this.sort).subscribe(response => {
      this.sessionList = response?.data;
      this.totalRecords = response?.totalRecordCount;
      this.pagin = Math.ceil(this.totalRecords / 6);
      this.pages = _.range(this.pagin);
      console.log(response);
    })
  }
  // Sorting Functions
  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getAllSessions();
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getAllSessions();
  }
  sortByRegisterName() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.getAllSessions();
  }
  sortByDate() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.getAllSessions();
  }
  sortByRequested() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
    this.getAllSessions();
  }
  sortByStatus() {
    if (this.sort == 13) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 12 ? 13 : 12;
    }
    this.getAllSessions();
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
    this.getAllSessions();
  }

}

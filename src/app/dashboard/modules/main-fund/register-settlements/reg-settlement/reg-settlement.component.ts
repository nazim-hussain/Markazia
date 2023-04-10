import { Component } from '@angular/core';
import { RegisterSettlementService } from '../register-settlements-service/register-settlement.service';
import * as _ from 'underscore';
import { TransactionHistoryService } from '../../../treasury/transactions-history/transaction-history-services/transaction-history.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reg-settlement',
  templateUrl: './reg-settlement.component.html',
  styleUrls: ['./reg-settlement.component.scss']
})
export class RegSettlementComponent {
  searchText: string = '';
  filterParams: string = undefined;
  sort: number = 1;
  totalRecords: number = 0;
  pageNo: number = 0;
  pageSize: number = 6;
  pagin: number;
  pages: any[] = [];
  sessionList: any[] = [];
  branchesList: any[] = [];
  employeesList: any[] = [];
  statusList: any[] = [];
  sessionFilterForm: FormGroup;
  constructor(private _registerSettlementService: RegisterSettlementService,
    private _transactionHistoryService: TransactionHistoryService, private fb: FormBuilder, public datepipe: DatePipe) {

  }
  initFilterForm() {
    this.sessionFilterForm = this.fb.group({
      register: [''],
      branch: [null],
      createdBy: [null],
      date: [''],
      status: [null],
    })
  }
  ngOnInit() {
    this.getAllSessions(this.filterParams);
    this.getBaranches();
    this.getEmployees();
    this.getStatusList();
    this.initFilterForm();
    this.sessionFilterForm.valueChanges.subscribe(value => {
      let dateObj = { fromDate: '', toDate: '' };
      let formValues;
      if (value['date']) {
        dateObj['fromDate'] = this.datepipe.transform(value['date'][0], 'yyyy-MM-dd');
        dateObj['toDate'] = this.datepipe.transform(value['date'][1], 'yyyy-MM-dd');;
      }
      formValues = { ...value, ...dateObj };
      delete formValues['date'];
      let isEmpty = true;
      for (let obj in value) {
        if (value[obj]) {
          this.pageNo = 0;
          isEmpty = false;
        }
        if (formValues[obj] == null) {
          formValues[obj] = ''
        }
      }
      this.filterParams = '?' + new URLSearchParams(formValues).toString();
      if (isEmpty) {
        this.filterParams = undefined;
        this.pageNo = 0;
      }
      this.getAllSessions(this.filterParams)
    })
  }
  resetDate() {
    this.sessionFilterForm.controls['date'].setValue('');
  }
  resetRegisterNo() {
    this.sessionFilterForm.controls['register'].setValue('');
  }
  getAllSessions(filterParams = this.filterParams) {
    let defaultParams = `pageNo=${this.pageNo}&sort=${this.sort}&pageSize=${this.pageSize}`
    this._registerSettlementService.getAllSessions((filterParams && filterParams + `&${defaultParams}`) || (`?${defaultParams}`)).subscribe(response => {
      this.sessionList = response?.data;
      this.totalRecords = response?.totalRecordCount;
      this.pagin = Math.ceil(this.totalRecords / 6);
      this.pages = _.range(this.pagin);
    })
  }
  getBaranches() {
    this._transactionHistoryService.GetBranches().subscribe(response => {
      this.branchesList = response.data;
      console.log(this.branchesList);
    })
  }
  getEmployees() {
    this._transactionHistoryService.GetEmployees().subscribe(response => {
      this.employeesList = response.data;
    })
  }
  getStatusList() {
    this._registerSettlementService.getStatusList().subscribe(response => {
      this.statusList = response.data;
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

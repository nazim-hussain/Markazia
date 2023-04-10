import { Component } from '@angular/core';
import * as _ from 'underscore';
import { AllocationService } from './allocation-services/allocation.service';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss'],
})
export class mainfundAllocationComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number = 18;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  provideExpenses: any;
  lastAllocationOrder: any;
  AllocationOrder: any[] = [];

  search: string;
  constructor(private _allocationService: AllocationService) {}

  ngOnInit(): void {
    this.getLastAllocation();
    this.getAllocationList();
  }
  handleSearchInput(event) {
    console.log(event.target.value);
    const value = event.target.value;
    this.searchText = value;
    if(value.length > 2)
    this.getAllocationList()
    if (!value)
      this.getAllocationList()
  }
  /**
   * get last allocation service
   */
  getLastAllocation() {
    this._allocationService.getLastAllocation().subscribe((response) => {
      console.log(response, 'last allocation response');
      if (response?.isSuccess == true) {
        this.lastAllocationOrder = response?.data;
      }
    });
  }

  /**
   * get list of allocation orders
   */
  getAllocationList() {
    this._allocationService.getAllocation(this.pageNo,this.searchText,this.sort).subscribe((response) => {
      console.log(response, 'list of  allocation response');
      if (response) {
        this.AllocationOrder = response?.data;
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
    this.sort = 1;
    this.getAllocationList();
  }

  // Sorting Functions
  sortByOrder() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getAllocationList();
  }
  sortByDate() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
        this.getAllocationList();
  }
  sortByDeposit() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
        this.getAllocationList();
  }
  sortByGrandAmount() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
        this.getAllocationList();
  }
  sortByCreated() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
        this.getAllocationList();
  }
  sortByStatus() {
    if (this.sort == 13) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 12 ? 13 : 12;
    }
        this.getAllocationList();
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
    this.getAllocationList();
  }
  // navigate
  // navigate(){
  //   th
  // }
}

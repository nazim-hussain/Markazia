import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { BranchService } from './services/branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  branches!: any[];
  totalRecords!: number;
  totalPages!: number;
  errorMessage: any;
  totalAllRecordsCount: number;
  totalRecordsCount:number
  searchText: string = '';
  sort: number = 1;
  branchTypes: any = [];
  branchId: number = 3001;
  typeName: string = 'Showroom Branches';
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  @Output() titleOfPage = new EventEmitter<string>();

  constructor(
    private branchService: BranchService,
    private router: Router,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Branches');

    this.getBranches();
    this.getBranchTypes();
  }
  addbranch() {
    this.router.navigateByUrl('/branches/addbranch');
    this.headerService.setTitle('Branches > Add branch');
    // this.titleOfPage.emit('Branches > Add branch');
  }
  Viewbranch() {
    // this.router.navigateByUrl('/addbranch');
    this.headerService.setTitle('Branches > View branch');
    // this.titleOfPage.emit('Branches > Add branch');
    // view-branch/{{item.branchId}}
  }
  chooseBranch(item: any) {
    this.branchId = item.id;
    this.typeName = item.name[0].lookupName;
    this.pageNo = 0;
    this.searchText = '';

    this.getBranches();
  }
  getBranches() {
    return this.branchService
      .getBranches(this.searchText, this.branchId, this.sort, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.branches = response.data;
          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;
          this.totalRecordsCount = response.info?.totalRecordsCount;

          this.totalRecords = response.info?.totalRecordsCount;
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

      this.getBranches();
    }
    if (text.length == 0) {
      this.getBranches();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.getBranches();
  }

  sortByBranchName() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getBranches();
  }
  sortByLocation() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getBranches();
  }
  sortByActivation() {
    this.sort = this.sort == 6 ? 7 : 6;
    this.getBranches();
  }

  setPage(page: number) {
    this.pageNo = page;
    this.getBranches();
    window.scroll(0, 0);
  }

  getBranchTypes() {
    this.branchService.getLookupsById(3).subscribe(
      (response: any) => {
        this.branchTypes = response.data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users!: any[];
  totalRecords!: number;
  totalPages!: number;

  searchText: string = '';
  sort: number = 1;

  branchId: any = '';
  roleId: any = '';

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  totalRecordsCount:number;
  constructor(
    private userService: UserService,
    private router: Router,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Users');

    this.getUsers();
    this.GetBranches();
    this.GetRoles();
  }
  addUser() {
    this.router.navigateByUrl('/users/adduser');

    this.headerService.setTitle('Users > Add user');
  }
  viewUser() {
    // this.router.navigateByUrl('/addbranch');
    this.headerService.setTitle('Users > View user');
    // this.titleOfPage.emit('Branches > Add branch');
    // view-branch/{{item.branchId}}
  }
  getUsers() {
    return this.userService
      .GetUsers(
        this.searchText,
        this.sort,
        this.branchId,
        this.roleId,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.users = response.data;
          this.totalPages = response.totalPages;
          this.totalRecordsCount = response.info.totalRecordsCount;
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
      this.getUsers();
    }
    if (text.length == 0) {
      this.getUsers();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.getUsers();
  }

  sortByName() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getUsers();
  }
  sortByNoUser() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getUsers();
  }
  sortByIndoorOutdoor() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.getUsers();
  }
  sortByActivation() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.getUsers();
  }
  filterByBranchId(e) {
    console.log(e);
    this.branchId = e.branchId;
    this.pageNo = 0;
    this.getUsers();
  }
  clearBranch($event) {
    this.branchId = '';
    this.getUsers();
  }
  filterByRoleId(e) {
    console.log(e);
    this.roleId = e.roleId;
    this.pageNo = 0;
    this.getUsers();
  }
  clearRole($event) {
    this.roleId = '';
    this.getUsers();
  }
  setPage(page: number) {
    this.pageNo = page;
    this.getUsers();
    window.scroll(0, 0);
  }

  branches: any;
  searchBranch: string = '';

  GetBranches() {
    return this.userService
      .GetBranches(this.searchBranch)
      .subscribe((response: any) => {
        if (response) {
          this.branches = response.data;
        }
      });
  }

  roles: any;
  GetRoles() {
    return this.userService.GetRoles().subscribe((response: any) => {
      if (response) {
        this.roles = response.data;
      }
    });
  }
}

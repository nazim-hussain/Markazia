import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { RolesService } from './services/roles.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  roles!: any[];
  totalRecords!: number;
  totalPages!: number;

  searchText: string = '';
  sort: number = 1;

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  totalRecordsCount:number;
  constructor(
    private rolesService: RolesService,
    private router: Router,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Roles');

    this.getRoles();
  }
  addRole() {
    this.router.navigateByUrl('/roles/add-role');
    this.headerService.setTitle('Roles > Add role');
  }
  viewRoles() {
    // this.router.navigateByUrl('/addbranch');
    this.headerService.setTitle('Roles > View role');
    // this.titleOfPage.emit('Branches > Add branch');
    // view-branch/{{item.branchId}}
  }
  getRoles() {
    return this.rolesService
      .getRoles(this.searchText, this.sort, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
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
      this.getRoles();
    }
    if (text.length == 0) {
      this.getRoles();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.getRoles();
  }

  sortByName() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getRoles();
  }
  sortByNoUser() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getRoles();
  }
  sortByIndoorOutdoor() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.getRoles();
  }
  sortByActivation() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.getRoles();
  }

  setPage(page: number) {
    this.pageNo = page;
    this.getRoles();
    window.scroll(0, 0);
  }
}

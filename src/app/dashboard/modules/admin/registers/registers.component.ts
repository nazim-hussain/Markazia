import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss'],
})
export class RegistersComponent implements OnInit {
  registers!: any[];
  totalRecords!: number;
  totalPages!: number;

  searchText: string = '';
  sort: number = 1;

  branchId: any = '';
  roleId: any = '';

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  totalRecordsCount: number;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Registers');

    this.GetRegisters();
    // this.registers = [];
  }
  addUser() {
    this.router.navigateByUrl('/registers/add-register');

    this.headerService.setTitle('Registers > Add Register');
  }

  GetRegisters() {
    return this.registerService
      .GetRegisters(this.searchText, this.sort, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.registers = response.data;
          this.totalPages = response.totalPages;
          this.totalRecordsCount = response.totalRecordsCount;

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
      this.GetRegisters();
    }
    if (text.length == 0) {
      this.GetRegisters();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.GetRegisters();
  }

  sortByName() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.GetRegisters();
  }
  sortByNoUser() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.GetRegisters();
  }
  sortByIndoorOutdoor() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.GetRegisters();
  }
  sortByActivation() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.GetRegisters();
  }
  viewRegister() {
    this.headerService.setTitle('Registers > View Register');
  }
  setPage(page: number) {
    this.pageNo = page;
    this.GetRegisters();
    window.scroll(0, 0);
  }
}

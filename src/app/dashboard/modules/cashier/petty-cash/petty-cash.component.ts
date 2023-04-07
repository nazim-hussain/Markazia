import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss'],
})
export class PettyCashComponent  {
  expenses!: any[];
  totalRecords!: number;
  totalPages!: number;
  items = [1, 2, 1, 2, 1, 2];

  searchText: string = '';
  sort: number = 1;

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];

  constructor(public headerService: HeaderService, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.headerService.setTitle('Petty Cash');
  }

  selected: number = 1;

  goToPage(value) {
    this.selected = value;
  }
}

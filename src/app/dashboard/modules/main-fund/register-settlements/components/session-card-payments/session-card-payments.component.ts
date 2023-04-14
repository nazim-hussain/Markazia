import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-session-card-payments',
  templateUrl: './session-card-payments.component.html',
  styleUrls: ['./session-card-payments.component.scss']
})
export class SessionCardPaymentsComponent {
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  searchText: string = '';
  @Input() response;
  sessionCards: any;
  totalRecordCount: number;
  @Output() loadCardData = new EventEmitter<any>();
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.response = changes['response'].currentValue
    this.sessionCards = this.response?.cards;
    this.totalRecordCount = this.response?.totalRecordCount;
    this.pagin = Math.ceil(this.totalRecordCount / 6);
    this.pages = _.range(this.pagin);
  }
  ngOnInit() {
  }
  setPage(page: number) {
    this.pageNo = page;
    this.loadCardData.emit({ page, customer: '' });
    window.scroll(0, 0);
  }
  removeSearch() {
    this.searchText = '';
    this.loadCardData.emit({ page: 0, customer: '' })
  }
  searchData(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.searchText = text;
      this.loadCardData.emit({ page: 0, customer: text })
    }
    else if (text.length == 0) {
      this.loadCardData.emit({ page: 0, customer: '' })
    }
  }
}

import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-session-cheques',
  templateUrl: './session-cheques.component.html',
  styleUrls: ['./session-cheques.component.scss']
})
export class SessionChequesComponent {
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  searchText: string = '';
  @Input() response;
  sessionCheques: any;
  totalRecordCount: number;
  @Output() loadData = new EventEmitter<any>();
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.response = changes['response'].currentValue
    this.sessionCheques = this.response?.data;
    this.totalRecordCount = this.response?.totalRecordCount;
    this.pagin = Math.ceil(this.totalRecordCount / 6);
    this.pages = _.range(this.pagin);
  }
  ngOnInit() {
  }
  setPage(page: number) {
    this.pageNo = page;
    this.loadData.emit({ page, chequeNumber: '' });
    window.scroll(0, 0);
  }
  removeSearch() {
    this.searchText = '';
    this.loadData.emit({ page: 0, chequeNumber: ''})

  }
  searchData(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.searchText = text;
      this.loadData.emit({ page: 0, chequeNumber:text})
    }
    else if (text.length == 0) {
      this.loadData.emit({ page: 0, chequeNumber: ''})
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../services/shared.service';
import { CollectService } from '../../services/collect.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-spare',
  templateUrl: './spare.component.html',
  styleUrls: ['./spare.component.scss'],
})
export class SpareComponent implements OnInit {

  items = [1, 2];

  detaisId: number;
  constructor(
    private collectService: CollectService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.detaisId = this.route.snapshot.params['id'];
    // this.detaisId = 62;
    if (this.detaisId) {
      this.GetServicesSalesOrderSpareparts();
    }
  }

  Spareparts: any;
  totaAmount: number;
  totalRecordCount: number;
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  GetServicesSalesOrderSpareparts() {
    return this.collectService
      .GetServicesSalesOrderSpareparts(this.detaisId, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.Spareparts = response.data;
          this.totaAmount = response.info.totaAmount;

          this.totalRecordCount = response.info?.totalRecordCount;

          // this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecordCount / 3);
          this.pages = _.range(this.pagin);
        }
      });
  }

  setPage(page: number) {
    this.pageNo = page;
    this.GetServicesSalesOrderSpareparts();
  }
}

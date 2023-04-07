import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { CollectService } from './services/collect.service';
import { SharedService } from 'src/app/services/shared.service';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {
  branches!: any[];
  totalRecords!: number;
  totalPages!: number;
  errorMessage: any;
  totalAllRecordsCount: number;
  searchText: string = '';
  vin: string = '';
  sort: number = 1;
  branchTypes: any = [];
  branchId: number;
  bId: number;
  typeName: string = 'Showroom Branches';
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  select: number;
  roleId: number;
  serviceAdvisorId: string = '';
  salesConsultantId: string = '';
  userId: number;
  @Output() titleOfPage = new EventEmitter<string>();

  isService: boolean = true;
  isRevenus: boolean;
  collectionOrderNum: number;

  constructor(
    private collectService: CollectService,
    private router: Router,
    public headerService: HeaderService,
    public sharedService: SharedService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.headerService.setTitle('Collect');

    this.branchId =
      this.sharedService?.getRegister?.registerObj.registeBranch.branchId;
    // this.branchId = 66;
    this.bId =
      this.sharedService?.getRegister?.registerObj.registeBranch.branchId;

    if (localStorage.getItem('collectBranchId')) {
      this.branchId = +localStorage.getItem('collectBranchId');
    }
    if (localStorage.getItem('collectUserId')) {
      this.userId = +localStorage.getItem('collectUserId');
      this.serviceAdvisorId = localStorage.getItem('collectUserId');
      this.salesConsultantId = localStorage.getItem('collectUserId');
    }

    if (localStorage.getItem('collectSearchText')) {
      this.searchText = localStorage.getItem('collectSearchText');
    }
    if (localStorage.getItem('collectVin')) {
      this.vin = localStorage.getItem('collectVin');
    }

    this.GetRegisterDetails();
    // this.GetServicesSalesOrders();
    // this.GetDirectPaymentSalesOrders();

    // this.getBranches();
    // this.getUsers();
  }
  addbranch() {
    this.router.navigateByUrl('/addbranch');
    this.headerService.setTitle('Collect > Add Collect');
    // this.titleOfPage.emit('Branches > Add branch');
  }
  ViewCollectDetails(item) {
    localStorage.setItem(
      'collectionOrderNum',
      this.collectionOrderNum.toString()
    );
    if (this.branchId) {
      console.log(this.branchId);
      localStorage.setItem('collectBranchId', this.branchId?.toString());
    }
    if (this.userId) {
      localStorage.setItem('collectUserId', this.userId?.toString());
    }
    if (this.searchText) {
      localStorage.setItem('collectSearchText', this.searchText);
    }
    if (this.vin) {
      localStorage.setItem('collectVin', this.vin);
    }

    if (this.collectionOrderNum == 7001) {
      this.headerService.setTitle('Collect > View services sales order');
      this.router.navigateByUrl(
        '/collect/details/service/' + item.servicesSalesOrderNo
      );
    } else if (this.collectionOrderNum == 7002) {
      this.headerService.setTitle('Collect > Direct payment sales order');
      this.router.navigateByUrl(
        '/collect/details/payment/' + item.directPaymentSalesOrderOpportunityNo
      );
      this.GetDirectPaymentSalesOrders();
    } else if (this.collectionOrderNum == 7003) {
      this.router.navigateByUrl(
        '/collect/details/spare/' + item.sparePartsSalesOrderOpportunityNo
      );
      this.headerService.setTitle('Collect > Spare parts sales order');
    }

    // this.router.navigateByUrl('/addbranch');

    // this.titleOfPage.emit('Branches > Add branch');
    // view-branch/{{item.branchId}}
  }

  openModalPaymentTypes(item) {
    const modalRef = this.modalService.open(ModalPaymentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.detailsItem = item;
    modalRef.componentInstance.collectionType = this.collectionOrderNum;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      // console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetRegisterDetails();
    });

    localStorage.setItem(
      'collectionOrderNum',
      this.collectionOrderNum.toString()
    );
  }

  openModalPayment() {}
  tabIndex: number = 0;
  chooseBranch(item: any, i) {
    this.branchId =
      this.sharedService?.getRegister?.registerObj.registeBranch.branchId;
    // this.branchId = item.id;
    // this.typeName = item.name[0]?.lookupName;
    // console.log(item);
    // console.log(item.order[0].lookupId);
    localStorage.removeItem('collectionOrderNum');
    localStorage.removeItem('collectUserId');
    localStorage.removeItem('collectSearchText');
    localStorage.removeItem('collectVin');

    this.vin = '';
    this.userId = null;
    this.pageNo = 0;
    this.searchText = '';
    this.select = item.order[0].lookupId;
    this.tabIndex = i;
    // console.log(this.tabIndex);
    this.collectionOrderNum = item.order[0].lookupId;

    if (item.order[0].lookupId == 7001) {
      this.isService = true;
      this.roleId = 32;
      this.serviceAdvisorId = '';
      this.getUsers();
      this.GetServicesSalesOrders();
    } else if (item.order[0].lookupId == 7002) {
      this.isService = false;
      this.roleId = 33;
      this.salesConsultantId = '';
      this.collects = [];
      this.getUsers();
      this.GetDirectPaymentSalesOrders();
    } else if (item.order[0].lookupId == 7003) {
      this.isService = false;
      this.roleId = 33;
      this.salesConsultantId = '';
      this.collects = [];
      this.getUsers();
      this.GetSparePartsSalesOrders();
      console.log('GetSparePartsSalesOrders');
    } else if (item.order[0].lookupId == 7004) {
      this.isRevenus = false;
      this.roleId = 32;
      this.getUsers();
      // this.GetServicesSalesOrders();
      this.totalRecordsCount = 0;
      this.collects = [];
    }

    // if (this.tabIndex == 1) {
    //   this.isService = false;

    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   this.GetServicesSalesOrders();
    // }
    // this.getBranches();
  }
  isForAll: boolean = false;
  registers: any;
  collectionOrder: any;
  GetRegisterDetails() {
    return this.collectService
      .GetRegisterDetails(this.sharedService.getRegister.registerObj?.id)
      .subscribe((response: any) => {
        if (response) {
          this.registers = response.data;
          this.collectionOrder = this.registers.collectionOrder;

          this.collectionOrder.some(
            (item, idx) =>
              item.order[0].lookupId == 7002 &&
              this.collectionOrder.unshift(
                this.collectionOrder.splice(idx, 1)[0]
              )
          );

          // print result
          console.log(this.collectionOrder);

          if (localStorage.getItem('collectionOrderNum')) {
            this.collectionOrderNum =
              +localStorage.getItem('collectionOrderNum');
            this.select = +localStorage.getItem('collectionOrderNum');
            this.loadDataWithCheck();
            console.log(this.collectionOrderNum);
          } else {
            this.collectionOrderNum =
              this.collectionOrder[0]?.order[0]?.lookupId;
            this.select = this.collectionOrder[0]?.order[0]?.lookupId;
            console.log(this.collectionOrder[0]?.order[0]?.lookupId);
            console.log(this.collectionOrderNum);
            this.loadDataWithCheck();
          }

          if (this.registers.collectForAllBranches == true) {
            this.isForAll = true;
          } else {
            if (this.registers.collectForOwnBranch == true) {
              this.isForAll = false;
              setTimeout(() => {
                this.branches = [];
              }, 1000);
            } else {
              console.log('collectForOwnBranch');
              setTimeout(() => {
                this.branches = [];
                this.branchId = null;
              }, 1000);
            }
          }
        }
      });
  }
  totalRecordsCount: number;
  ServicesSalesOrders: any;
  DirectPaymentSalesOrders: any;
  collects: any;
  GetServicesSalesOrders() {
    return this.collectService
      .GetServicesSalesOrders(
        this.branchId,
        this.searchText,
        this.vin,
        this.serviceAdvisorId,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.collects = response.data;

          this.totalRecordsCount = response.info?.totalRecordsCount;
          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;

          this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          // console.log(this.pagin);
          // console.log(this.pages);
        }
      });
  }

  GetDirectPaymentSalesOrders() {
    return this.collectService
      .GetDirectPaymentSalesOrders(
        this.branchId,
        this.searchText,
        this.vin,
        this.salesConsultantId,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.collects = response.data;

          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;
          this.totalRecordsCount = response.info?.totalRecordsCount;
          this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          // console.log(this.pagin);
          // console.log(this.pages);
        }
      });
  }

  GetSparePartsSalesOrders() {
    return this.collectService
      .GetSparePartsSalesOrders(
        this.branchId,
        this.searchText,
        this.vin,
        this.salesConsultantId,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.collects = response.data;
          this.totalRecordsCount = response.info?.totalRecordsCount;

          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;

          this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          // console.log(this.pagin);
          // console.log(this.pages);
        }
      });
  }

  getBranches() {
    return this.collectService.GetBranches().subscribe((response: any) => {
      if (response) {
        this.branches = response.data;

        // this.totalPages = response.totalPages;
        // this.totalAllRecordsCount = response.info?.totalAllRecordsCount;

        // this.totalRecords = response.info?.totalRecordsCount;
        // this.pagin = Math.ceil(this.totalRecords / 6);
        // this.pages = _.range(this.pagin);
        // console.log(this.pagin);
        // console.log(this.pages);
      }
    });
  }

  users: any;
  getUsers() {
    console.log('his.users');
    return this.collectService
      .getUsers(this.roleId)
      .subscribe((response: any) => {
        if (response) {
          this.users = response.data;
        }
      });
  }

  // getBranches() {
  // return this.collectService
  //   .getBranches(this.searchText, this.branchId, this.sort, this.pageNo)
  //   .subscribe((response: any) => {
  //     if (response) {
  //       this.branches = response.data;

  //       this.totalPages = response.totalPages;
  //       this.totalAllRecordsCount = response.info?.totalAllRecordsCount;

  //       this.totalRecords = response.info?.totalRecordsCount;
  //       this.pagin = Math.ceil(this.totalRecords / 6);
  //       this.pages = _.range(this.pagin);
  //       console.log(this.pagin);
  //       console.log(this.pages);
  //     }
  //   });
  // }

  loadDataWithCheck() {
    if (this.collectionOrderNum == 7001) {
      this.isService = true;
      this.getBranches();
      this.GetServicesSalesOrders();
      this.roleId = 32;
      this.getUsers();
    } else if (this.collectionOrderNum == 7002) {
      this.isService = false;
      this.getBranches();
      this.GetDirectPaymentSalesOrders();
      this.roleId = 33;
      this.getUsers();
    } else if (this.collectionOrderNum == 7003) {
      this.isService = false;
      this.getBranches();
      this.GetSparePartsSalesOrders();
      this.roleId = 33;
      this.getUsers();
    }
  }
  search(event: any) {
    // console.log(event?.target.value);
    const text = event.target.value;
    // console.log(text.length);
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  removeSearch() {
    this.searchText = '';
    this.pageNo = 0;
    this.sort = 1;
    // this.branchId =
    //   this.sharedService?.getRegister?.registerObj.registeBranch.branchId;
    this.loadDataWithCheck();
  }

  searchVin(event: any) {
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.vin = text;
      this.pageNo = 0;

      this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  removeSearchVin() {
    this.vin = '';
    this.pageNo = 0;
    this.sort = 1;
    // this.branchId =
    //   this.sharedService?.getRegister?.registerObj.registeBranch.branchId;
    this.loadDataWithCheck();
  }

  sortByCustomer() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }

    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }
  sortByType() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }
  sortByStatus() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }
  sortByTax() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }

  sortByPrice() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }
  sortByDate() {
    if (this.sort != 12) {
      this.sort = 12;
    } else {
      this.sort = this.sort == 12 ? 1 : 12;
    }
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   this.GetServicesSalesOrders();
    // }
  }

  sortByActivation() {
    this.sort = this.sort == 6 ? 7 : 6;
    this.getBranches();
  }

  setPage(page: number) {
    this.pageNo = page;
    // this.GetServicesSalesOrders();
    // window.scroll(0, 0);
    // console.log(this.select);
    // console.log(this.tabIndex);

    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
  }

  filterBybranchId(e) {
    console.log(e);
    this.branchId = e.branchId;
    this.pageNo = 0;

    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   this.GetServicesSalesOrders();
    // }

    // if (this.isService == false) {
    //   this.GetDirectPaymentSalesOrders();
    // } else {
    //   this.GetServicesSalesOrders();
    // }
  }
  clearBranch($event) {
    this.branchId = 0;

    this.getUsers();
    this.loadDataWithCheck();

    // if (this.tabIndex == 1) {
    //   this.isService = false;
    //   this.GetDirectPaymentSalesOrders();
    // } else if (this.tabIndex == 2) {
    //   this.isService = false;
    //   this.GetSparePartsSalesOrders();
    // } else if (this.tabIndex == 0) {
    //   this.isService = true;
    //   // this.roleId = 32;
    //   // this.getUsers();
    //   this.GetServicesSalesOrders();
    // }
    this.branchId = null;
  }
  collectUserId: number;
  filterByUserId(e) {
    console.log(e);
    this.pageNo = 0;
    // this.loadDataWithCheck();
    if (this.collectionOrderNum == 7002) {
      this.isService = false;
      this.salesConsultantId = e.userId;
      this.GetDirectPaymentSalesOrders();
    } else if (this.collectionOrderNum == 7003) {
      this.isService = false;
      this.salesConsultantId = e.userId;
      this.GetSparePartsSalesOrders();
    } else if (this.collectionOrderNum == 7001) {
      this.isService = true;
      this.serviceAdvisorId = e.userId;
      this.GetServicesSalesOrders();
    }
  }
  clearUser($event) {
    this.serviceAdvisorId = '';
    this.salesConsultantId = '';
    localStorage.removeItem('collectUserId');
    this.getUsers();
    if (this.collectionOrderNum == 7002) {
      this.isService = false;
      this.salesConsultantId = '';
      this.GetDirectPaymentSalesOrders();
    } else if (this.collectionOrderNum == 7003) {
      this.isService = false;
      this.salesConsultantId = '';
      this.GetSparePartsSalesOrders();
    } else if (this.collectionOrderNum == 7001) {
      this.isService = true;
      this.serviceAdvisorId = '';
      this.GetServicesSalesOrders();
    }
  }
}

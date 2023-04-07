import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../services/shared.service';
import { ModalMessageComponent } from '../../../../../shared/components/modal-message/modal-message.component';
import { ModalNeedmodifyComponent } from '../components/modal-needmodify/modal-needmodify.component';
import { ModalPaymentComponent } from '../modal-payment/modal-payment.component';
import { CollectService } from '../services/collect.service';

@Component({
  selector: 'app-collect-details',
  templateUrl: './collect-details.component.html',
  styleUrls: ['./collect-details.component.scss'],
})
export class CollectDetailsComponent implements OnInit {
  items = [1, 2];

  detailsType: string;
  colType: number;
  detailsId: any;
  constructor(
    private collectService: CollectService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.detailsType = this.route.snapshot.params['type'];
    this.detailsId = this.route.snapshot.params['id'];
    console.log(this.detailsType);
    console.log(this.detailsId);
    if (this.detailsId && this.detailsType == 'service') {
      this.GetServicesSalesOrderDetails();
      this.colType = 7001;
    } else if (this.detailsId && this.detailsType == 'payment') {
      this.GetDirectPaymentSalesOrdersDetails();
      this.colType = 7002;
    } else if (this.detailsId && this.detailsType == 'spare') {
      this.GetSparePartsSalesOrdersDetails();
      this.colType = 7003;
    }
  }

  details: any;
  custmerName: string;
  GetServicesSalesOrderDetails() {
    return this.collectService
      .GetServicesSalesOrderDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          const customername = this.details.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
        }
      });
  }

  GetDirectPaymentSalesOrdersDetails() {
    return this.collectService
      .GetDirectPaymentSalesOrdersDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          const customername = this.details?.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
        }
      });
  }

  GetSparePartsSalesOrdersDetails() {
    return this.collectService
      .GetSparePartsSalesOrdersDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          const customername = this.details?.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
        }
      });
  }

  openModalPayment() {
    const modalRef = this.modalService.open(ModalPaymentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.detailsItem = this.details;
    modalRef.componentInstance.collectionType = this.colType;
  }

  NeedModify() {
    const modalRef = this.modalService.open(ModalNeedmodifyComponent);
    modalRef.componentInstance.SalesOrderId = this.detailsId;
    modalRef.componentInstance.OrderType = this.details.orderTypeId;
    if (this.detailsId && this.detailsType == 'service') {
      modalRef.componentInstance.userType = 'service advisor';
    } else if (this.detailsId && this.detailsType == 'payment') {
      modalRef.componentInstance.userType = 'Sales Consultant';
    } else if (this.detailsId && this.detailsType == 'spare') {
      modalRef.componentInstance.userType = 'Sales Consultant';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../../../services/header.service';
import { SharedService } from '../../../../services/shared.service';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { CloseRegisterService } from './services/close-register.service';
import * as _ from 'underscore';
import { ModalCloseComponent } from './components/modal-close/modal-close.component';
import { ModalMessageComponent } from '../../../../shared/components/modal-message/modal-message.component';

@Component({
  selector: 'app-close-register',
  templateUrl: './close-register.component.html',
  styleUrls: ['./close-register.component.scss'],
})
export class CloseRegisterComponent implements OnInit {
  isShow: boolean = true;
  isClose: boolean;
  isNoOPenSession: boolean;

  items = [1, 2, 1, 2, 1, 2];
  formGroup: FormGroup;
  submitted = false;

  registerName: string;
  registerId: string;
  branchName: string;
  cityName: string;

  currentDate = new Date();
  selected: number = 1;
  // registerId: number;
  intervalId;
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  closingNotes: string;
  constructor(
    public closeRegisterService: CloseRegisterService,
    private modalService: NgbModal,
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public headerService: HeaderService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.headerService.setTitle('Close Register');

    this.registerName =
      this.sharedService.getRegister?.registerObj?.registersName;
    this.registerId = this.sharedService.getRegister?.registerObj?.id;

    this.branchName =
      this.sharedService?.getRegister?.registerObj.registeBranch.branchName;
    this.cityName =
      this.sharedService?.getRegister?.registerObj.registeBranch.city;
    console.log(this.registerName);
    this.getForm();
    // this.GetRegisterClosingData();

    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  getForm() {
    this.formGroup = this.fb.group({
      registerId: this.registerId,
      closingNotes: 0,
      registerSessionClosingAmounts: this.fb.array([]),
    });
  }

  AddCurruncys() {
    return this.fb.group({
      currencyID: 0,
      registeredAmount: 0,
      actualAmount: [null, Validators.min(1)],
      differenceAmount: 0,
      currencyName: '',
    });
  }
  get registerSessionClosingAmounts() {
    return this.formGroup.controls[
      'registerSessionClosingAmounts'
    ] as FormArray;
  }
  isCheque: boolean;
  isCard: boolean;
  chooseTab(val: number) {
    this.selected = val;

    // if (this.selected == 2) {
    //   this.selected = val;
    // } else if (this.selected == 3) {
    //   this.selected = val;
    // }

    if ((val = 2)) {
      this.isCheque = true;
      this.isCard = false;
    } else if ((val = 3)) {
      this.isCheque = false;
      this.isCard = true;
    }
  }

  ServicesSalesOrders: any;
  DirectPaymentSalesOrders: any;
  registerData: any;
  isNoOPenSessionMessage: string;
  GetRegisterClosingData() {
    return this.closeRegisterService
      .GetRegisterClosingData()
      .subscribe((response: any) => {
        if (response) {
          this.registerData = response.data;
          console.log(this.registerData);
          console.log(this.registerData.cashCollected);
          console.log(this.registerData.cashCollected.length);
          if (
            this.registerSessionClosingAmounts.length == 0
            // this.formGroup
            //   .get('registerSessionClosingAmounts')
            //   ['at'](0)
            //   .get('actualAmount').value == 0
          ) {
            console.log(this.registerData, 'eee');

            for (let w = 0; w < this.registerData?.cashCollected.length; w++) {
              this.registerSessionClosingAmounts.push(
                this.fb.group({
                  registeredAmount:
                    this.registerData.cashCollected[w].collectedAmount,
                  actualAmount: null,
                  differenceAmount: 0,
                  currencyID: this.registerData.cashCollected[w].currencyId,
                  currencyName:
                    this.registerData.cashCollected[w]?.currencyName[0]
                      .lookupName,
                })
              );
            }
          }

          // this.totalRecordsCount = response.info?.totalRecordsCount;
          // this.totalAllRecordsCount = response.info?.totalAllRecordsCount;

          // this.totalRecords = response.info?.totalRecordsCount;
          // this.pagin = Math.ceil(this.totalRecords / 6);
          // this.pages = _.range(this.pagin);
          // console.log(this.pagin);
          if (response?.Errors) {
            console.log(response.Errors);
            console.log(response.Errors[0].StatusCode);
            if (response.Errors[0].StatusCode == 82) {
              this.isNoOPenSession = true;
              this.isNoOPenSessionMessage = response?.Errors[0]?.ErrorMessageEn;
            }
          }
        }
      });
  }
  loadPageData(event) {
    this.GetRegisterClosingData();
  }
  calcDifference(event, i) {
    console.log(event.target.value);
    console.log(i);
    const mval = event.target.value;

    // if (
    //   mval <
    //   this.formGroup
    //     .get('registerSessionClosingAmounts')
    //     ['at'](i)
    //     .get('registeredAmount').value
    // ) {
    this.formGroup
      .get('registerSessionClosingAmounts')
      ['at'](i)
      .get('differenceAmount')
      .patchValue(
        this.formGroup
          .get('registerSessionClosingAmounts')
          ['at'](i)
          .get('registeredAmount').value - mval
      );
    // } else {
    //   this.formGroup
    //     .get('registerSessionClosingAmounts')
    //     ['at'](i)
    //     .get('actualAmount')
    //     .patchValue('');
    //   this.formGroup
    //     .get('registerSessionClosingAmounts')
    //     ['at'](i)
    //     .get('differenceAmount')
    //     .patchValue(0);
    // }
  }

  // registeredAmount: 0,
  // actualAmount: 0,
  // differenceAmount: 0,
  openModalEdit() {
    const modalRef = this.modalService.open(ModalEditComponent);
    modalRef.componentInstance.name = 'add';
  }

  nextStep() {
    if (this.selected == 1) {
      this.submitted = true;
      if (this.formGroup.invalid) {
        return window.scroll(0, 0);
      }

      this.selected = 2;
    } else if (this.selected == 2) {
      this.selected = 3;
    } else if (this.selected == 3) {
      this.GetRegisterClosingData();
      this.isClose = true;
    }
  }
  remainedSessions: number;
  CloseRegisterSession() {
    // const modalRef = this.modalService.open(ModalCloseComponent);
    // modalRef.componentInstance.type = 'success';

    this.formGroup.get('closingNotes').patchValue(this.closingNotes);

    return this.closeRegisterService
      .CloseRegisterSession(this.formGroup.value)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.remainedSessions = response.info.remainedSessions;
          console.log(response);
          const modalRef = this.modalService.open(ModalCloseComponent);
          modalRef.componentInstance.type = 'success';
          modalRef.componentInstance.message =
            'Close session done successfully';
          modalRef.componentInstance.remainedSessions =
            response.info.remainedSessions;
          modalRef.componentInstance.routeName = '/close-register';
          modalRef.componentInstance.loadPageData.subscribe((result: any) => {
            console.log('result', result);
            localStorage.removeItem('closeSession');

            window.location.reload();
          });
        } else {
          console.log('error', response);
          const modalRef = this.modalService.open(ModalCloseComponent);
          modalRef.componentInstance.type = 'error';
          modalRef.componentInstance.messageError = response.Errors;
          modalRef.componentInstance.routeName = '/close-register';
          modalRef.componentInstance.backToSecond.subscribe((result: any) => {
            console.log('result', result);
            this.modalService.dismissAll();
            this.isClose = false;
            this.selected = 2;
          });
        }
      });
  }
}

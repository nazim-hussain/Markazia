import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { CommonService } from '../../../../../../services/common.service';
import { CloseRegisterService } from '../../../../cashier/close-register/services/close-register.service';
import { RegisterSettlementService } from '../../register-settlements-service/register-settlement.service';

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
  bankList: any;
  cardForm: FormGroup;
  cardDetails: any;
  editCollectionResponse: any;
  @ViewChild('successModal') successModal: ElementRef;
  constructor(private fb: FormBuilder, private _registerSettlementService: RegisterSettlementService,
    private _modalService: NgbModal, private _closeRegisterService: CloseRegisterService, public _commonService: CommonService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.response = changes['response'].currentValue
    this.sessionCards = this.response?.cards;
    console.log(this.sessionCards);
    this.totalRecordCount = this.response?.totalRecordCount;
    this.pagin = Math.ceil(this.totalRecordCount / 6);
    this.pages = _.range(this.pagin);
  }
  ngOnInit() {
    this.initCardForm();
  }
  initCardForm() {
    this.cardForm = this.fb.group({
      cardCollectionJod: [{ value: '', disabled: true }, [Validators.required]],
      ordersCardsCollectionId: ['', [Validators.required]],
      lastTerminalId: ['', [Validators.required]],
      cardDrawerName: ['', [Validators.required]],
      cardInvoiceNo: ['', [Validators.required]],
      cardDate: ['', [Validators.required]],
      bankId: [null, [Validators.required]],
      cardFirst6Digits: ['', [Validators.required]],
      cardLast4Digits: ['', [Validators.required]],
    })
  }
  get f() {
    return this.cardForm.controls;
  }
  handleEditAction(content, item) {
    this.getBanks();
    this.cardDetails = {};
    this.cardDetails = item;
    let obj = {
      cardCollectionJod: item.cardCollectionJod,
      ordersCardsCollectionId: item.ordersCardsCollectionId,
      lastTerminalId: item?.cardTerminalId,
      //cardDrawerName: item.cardPayerName,
      cardInvoiceNo: item?.cardInvoiceNo,
      cardDate: formatDate(item?.cardDate, "yyyy-MM-dd", "en"),
      bankId: item?.bank[0]?.lookupId,
      cardFirst6Digits: item?.cardFirst6Digits,
      cardLast4Digits: item?.cardLast4Digits,
    }
    this.cardForm.patchValue(obj);
    this._modalService.open(content, { centered: true, size: 'lg' });
  }
  handleCheckBoxChange(event) {
    let value = event.target.checked;
    if (value) {
      this.cardForm.controls['cardDrawerName'].setValue(this.cardDetails?.cardPayerName);
    }
    else {
      this.cardForm.controls['cardDrawerName'].setValue('');
      this.cardForm.controls['cardDrawerName'].markAsTouched();
    }
  }
  handleActionClick(action, ordersCardsCollectionId) {
    let formData = new FormData();
    formData.append('action', action);
    formData.append('ordersCardsCollectionId', ordersCardsCollectionId);
    this._registerSettlementService.actionOnCard(formData).subscribe(response => {
      this.loadCardData.emit({ page: 0, customer: '' })
    })
  }
  hadleReverseActionOnCard(ordersCardsCollectionId) {
    let formData = new FormData();
    formData.append('ordersCardsCollectionId', ordersCardsCollectionId);
    this._registerSettlementService.reverseActionOnCard(formData).subscribe(response => {
      this.loadCardData.emit({ page: 0, customer: '' })
    })
  }
  handleSubmit() {
    if (this.cardForm.valid) {
      let formData = new FormData();
      formData.append('ordersCardsCollectionId', this.f['ordersCardsCollectionId'].value);
      formData.append('lastTerminalId', this.f['lastTerminalId'].value);
      formData.append('cardDrawerName', this.f['cardDrawerName'].value);
      formData.append('cardInvoiceNo', this.f['cardInvoiceNo'].value);
      formData.append('cardDate', this.f['cardDate'].value);
      formData.append('bankId', this.f['bankId'].value);
      formData.append('cardFirst6Digits', this.f['cardFirst6Digits'].value);
      formData.append('cardLast4Digits', this.f['cardLast4Digits'].value);
      this._registerSettlementService.editCollectionCard(formData).subscribe(response => {
        this.editCollectionResponse = response;
        if (this.editCollectionResponse.isSuccess) {
          this.loadCardData.emit({ page: 0, customer: '' })
          this._modalService.dismissAll();
          this._modalService.open(this.successModal, { centered: true,})
        }
      })
    }
    else {
      this.cardForm.markAllAsTouched();
    }
  }
  getBanks() {
    this._closeRegisterService.getLookupsById(11).subscribe((response: any) => {
      this.bankList = response.data.map((x) => ({
        id: x.id,
        name: x.name[0].lookupName,
      }));
    });
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

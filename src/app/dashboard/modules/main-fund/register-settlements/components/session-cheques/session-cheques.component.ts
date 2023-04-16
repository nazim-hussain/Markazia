import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { size } from 'underscore';
import { CommonService } from '../../../../../../services/common.service';
import { CloseRegisterService } from '../../../../cashier/close-register/services/close-register.service';
import { RegisterSettlementService } from '../../register-settlements-service/register-settlement.service';

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
  chequeDetails: any;
  editCollectionResponse: any;
  bankList: any;
  totalRecordCount: number;
  @Output() loadData = new EventEmitter<any>();
  chequeForm: FormGroup;
  constructor(private fb: FormBuilder, private _registerSettlementService: RegisterSettlementService,
    private _modalService: NgbModal, private _closeRegisterService: CloseRegisterService, public _commonService: CommonService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.response = changes['response'].currentValue;
    this.sessionCheques = this.response?.data;
    this.totalRecordCount = this.response?.totalRecordCount;
    this.pagin = Math.ceil(this.totalRecordCount / 6);
    this.pages = _.range(this.pagin);
  }
  ngOnInit() {
    this.initChequeForm();
  }
  initChequeForm() {
    this.chequeForm = this.fb.group({
      chequeCollectionId: ['', [Validators.required]],
      chequeCollectionJod: [{ value: '', disabled: true }, [Validators.required]],
      chequeDate: ['', [Validators.required]],
      bankId: [null, [Validators.required]],
      chequeDrawerName: ['', [Validators.required]],
      chequeNo: ['', [Validators.required]]
    })
  }
  get f() {
    return this.chequeForm.controls;
  }
  handleEditAction(content, item) {
    this.getBanks();
    this.chequeDetails = {};
    this.chequeDetails = item;
    let obj = {
      chequeCollectionId: item.chequeCollectionId,
      chequeCollectionJod: item?.chequeCollectionJod,
      chequeDate: formatDate(item?.chequeDate, "yyyy-MM-dd", "en"),
      bankId: item?.bank[0]?.lookupId,
      chequeNo: item?.chequeNo,
    }
    this.chequeForm.patchValue(obj);
    this._modalService.open(content, { centered: true, size: 'lg' });
  }
  handleCheckBoxChange(event) {
    let value = event.target.checked;
    if (value) {
      this.chequeForm.controls['chequeDrawerName'].setValue(this.chequeDetails?.chequeCustomer);
    }
    else {
      this.chequeForm.controls['chequeDrawerName'].setValue('');
      this.chequeForm.controls['chequeDrawerName'].markAsTouched();
    }
  }
  handleSubmit() {
    if (this.chequeForm.valid) {

      let formData = new FormData();
      formData.append('chequeCollectionId', this.f['chequeCollectionId'].value);
      formData.append('chequeDate', this.f['chequeDate'].value);
      formData.append('bankId', this.f['bankId'].value);
      formData.append('chequeDrawerName', this.f['chequeDrawerName'].value);
      formData.append('chequeNo', this.f['chequeNo'].value);
      this._registerSettlementService.editCollectionCheuqe(formData).subscribe(response => {
        this.editCollectionResponse = response;
        this.loadData.emit({ page: 0, chequeNumber: '' });
        this._modalService.dismissAll();
      })
    }
    else {
      this.chequeForm.markAllAsTouched();
    }
  }
  handleActionClick(action, chequeCollectionId) {
    let formData = new FormData();
    formData.append('action', action);
    formData.append('chequeCollectionId', chequeCollectionId);
    this._registerSettlementService.actionOnCheque(formData).subscribe(response => {
      this.loadData.emit({ page: 0, chequeNumber: '' })
    })
  }
  hadleReverseActionOnCheque(chequeCollectionId) {
    let formData = new FormData();
    formData.append('chequeCollectionId', chequeCollectionId);
    this._registerSettlementService.reverseActionOnCheque(formData).subscribe(response => {
      this.loadData.emit({ page: 0, chequeNumber: '' })
    })
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
    this.loadData.emit({ page, chequeNumber: '' });
    window.scroll(0, 0);
  }
  removeSearch() {
    this.searchText = '';
    this.loadData.emit({ page: 0, chequeNumber: '' })

  }
  searchData(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.searchText = text;
      this.loadData.emit({ page: 0, chequeNumber: text })
    }
    else if (text.length == 0) {
      this.loadData.emit({ page: 0, chequeNumber: '' })
    }
  }
}

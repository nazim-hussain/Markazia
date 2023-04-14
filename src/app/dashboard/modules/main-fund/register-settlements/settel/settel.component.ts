
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';
import { RegisterSettlementService } from '../register-settlements-service/register-settlement.service';


@Component({
  selector: 'app-settel',
  templateUrl: './settel.component.html',
  styleUrls: ['./settel.component.scss']
})
export class SettelComponent implements OnInit {
  isCheque: boolean;
  isCard: boolean;
  selected: number = 1;
  settlementDetails;
  sessionId;
  sessionCheques;
  sessionCardsPayments;
  pageNo = 0;
  searchText = '';
  differenceAmount = null;
  cashForm: FormGroup;
  @ViewChildren("amountDiffernce") amountDiffernce: QueryList<ElementRef>
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute, private _registerSettlementService: RegisterSettlementService,
    public _commonService: CommonService) {

  }
  ngOnInit() {
    this.initCashForm();
    this.activeRoute.params.subscribe(params => {
      this.sessionId = params['sessionId'];
      this.getSessionDetailsSettlements();
    })

  }
  initCashForm() {
    this.cashForm = this.fb.group({
      cashArray: this.fb.array([])
    })
  }
  get cashArray(): FormArray {
    return this.cashForm.get('cashArray') as FormArray;
  }
  getSessionDetailsSettlements() {
    this._registerSettlementService.getSessionDetailSettlement(this.sessionId).subscribe(response => {
      this.settlementDetails = response.data;
      console.log(this.settlementDetails);
      this.settlementDetails?.cashAtClosing.forEach(item => {
        let formGroup: FormGroup = this.fb.group({
          registerdAmount: [{ value:item.registerdAmount, disabled: true }],
          differenceAmount: [{ value: item.differenceAmount, disabled: true }],
          actualAmount: ['', [Validators.required]],
          difference: [{ value: '', disabled: true }],
          currency: [item.currency[0].lookupName]
        })
        this.cashArray.push(formGroup);
      })
    })
    console.log(this.cashForm); 
  }
  getSessionCheques() {
    this._registerSettlementService.getSessionCheques(this.sessionId, this.pageNo, this.searchText).subscribe(response => {
      this.sessionCheques = { ...response };
    })
  }
  getSessionCardsPayments() {
    this._registerSettlementService.getSessionCardsPayments(this.sessionId, this.pageNo, this.searchText).subscribe(response => {
      this.sessionCardsPayments = { ...response };
    })
  }
  handleKeyPress(event) {
    this._commonService.numberOnly(event)
  }
  actualAmountChange(amount, event, index) {
    let value = event.target.value
    let id = 'da' + index
    let item = this.amountDiffernce.find(x => x.nativeElement.id == id);
    if (!value) {
      item.nativeElement.value = '';
      return
    }
    item.nativeElement.value = (+amount) - (+value);
  }

  chooseTab(val: number) {
    this.searchText = '';
    this.pageNo = 0;
    this.selected = val;
    if ((val == 2)) {
      this.isCheque = true;
      this.isCard = false;
      this.getSessionCheques();
    } else if ((val == 3)) {
      this.isCheque = false;
      this.isCard = true;
      this.getSessionCardsPayments();
    }
  }
  handleLoadData(event) {
    this.pageNo = event.page;
    this.searchText = event.chequeNumber;
    this.getSessionCheques();
  }
  handleCardsLoad(event) {
    this.pageNo = event.page;
    this.searchText = event.customer;
    this.getSessionCardsPayments();
  }
}

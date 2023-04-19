import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../../../../services/header.service';
import { RegisterSettlementService } from '../register-settlements-service/register-settlement.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent {
  isCheque: boolean;
  isCard: boolean;
  selected: number = 1;
  settlementDetails;
  sessionCheques;
  sessionCardsPayments;
  pageNo = 0;
  searchText = '';
  sessionId;
  sessionDetails;
  constructor(private activeRoute: ActivatedRoute,
    private _registerSettlementService: RegisterSettlementService,
    private _headerService: HeaderService,
  ) {

  }
  ngOnInit() {
    this._headerService.setTitle('Unsettled Sessions');
    this.activeRoute.params.subscribe(params => {
      this.sessionId = params['sessionId'];
      this.getSessionDetailsSettlements();
    })
  }
  getSessionDetailsSettlements() {
    this._registerSettlementService.getSessionDetailSettlement(this.sessionId).subscribe(response => {
      this.sessionDetails = response.data;
    })
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

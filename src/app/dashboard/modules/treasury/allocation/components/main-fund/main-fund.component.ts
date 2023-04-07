import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { TreasuryService } from '../../../petty-cash-treasury/services/treasury.service';

@Component({
  selector: 'main-fund',
  templateUrl: './main-fund.component.html',
  styleUrls: ['./main-fund.component.scss']
})
export class MainFundComponent implements OnInit{
  sageBankAccountData!: any[];
  mainFundCashData!: any[];
  bdcChequesAmount: number;
  chequesAmount: number;
  totalCollectedFund: number;
  totalSageAmount: number;
  chequesAmountColor: "#FFD7E7";
  totalRecords: number;
  pages: number[];

  sort: number =0;
  pageNo: number = 0;
  searchText: string = '';
  pagins!: number;
  pageSize: number = 0;

  constructor(private treasuryService: TreasuryService) {}


  ngOnInit(): void {
    this.getMainFundData();
    this.getSageBanksAccountsData();
  }

allocationSearchedData(sort: number, pageNo: number,pageSize: number){
  this.treasuryService.sortSageBanksAccounts(sort,pageNo,pageSize).subscribe(response =>{
    console.log("========>>>>>>>>>",response)
    if(response){
      this.sageBankAccountData =  response.data;
    }
  })

}

getMainFundData(){

  this.treasuryService.getMainFundCash().subscribe(response =>{
    console.log("===>>>> main fund cash",response)

    if(response){
      this.mainFundCashData = response.data.cash;
      this.bdcChequesAmount = response.data.bdcChequesAmount;
      this.chequesAmount = response.data.chequesAmount;
      this.totalCollectedFund = response.data.totalCollectedJOD;
      
      
    }
    
  })

}

getSageBanksAccountsData(){
  this.treasuryService.getSageBanksAccounts().subscribe(response =>{
    console.log("===>>>> sage bank accounts",response)
    
    if(response) {
      
      this.sageBankAccountData = response.data;
      this.totalSageAmount = response.info.sageTotalAmouunt
      this.totalRecords = response.totalRecordCount;
      this.pagins =  Math.ceil(this.totalRecords / 6);
      this.pages = _.range(this.pagins);
      
    }
    
  })

}


  getColor(symbol: string): string{

    switch (symbol) {
      case 'JOD':
        return '#B9E0CA';
        break;
      case "USD":
        return '#F4CEFA';
        break;
      case "EURO":
        return '#F8E2BE';
        break;
      case "abc":
        return '#FFD7E7';
        break;
    default:
      return '#FFD7E7'
      
    }
  }

  getCurrencyFormatColor(symbol: string): string{
    switch (symbol) {
      case 'JOD':
        return '#38B36D';
        break;
      case "USD":
        return '#DB5AEE';
        break;
      case "EURO":
        return '#FFB536';
        break;
      case "abc":
        return '#FFD7E7';
        break;
    default:
      return '#FFD7E7'
      
    }
  }

  sortByAccountName(){
    if (this.sort == 2) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 1 ? 2 : 1;
    }
    this.allocationSearchedData(this.sort, this.pageNo, this.pageSize);
  }

  sortByAccountNo(){
    if (this.sort == 4) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 3 ? 4 : 3;
      this.allocationSearchedData(this.sort, this.pageNo, this.pageSize);
    }

  }

  sortByAmount(){
    if (this.sort == 6) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 5 ? 6 : 5;
      this.allocationSearchedData(this.sort, this.pageNo, this.pageSize);
    }

  }
  sortByCurrency(){
    if (this.sort == 8) {
      this.sort = 0;
    } else {
      this.sort = this.sort == 7 ? 8 : 7;
      this.allocationSearchedData(this.sort, this.pageNo, this.pageSize);
    }

  }

  setPage(page: number) {
    this.pageNo = page;
    this.allocationSearchedData(this.sort, this.pageNo, this.pageSize);
    window.scroll(0, 0);
  }


}

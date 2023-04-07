import { Component, OnInit } from '@angular/core';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { connect } from 'rxjs';
import { TreasuryService } from '../../../petty-cash-treasury/services/treasury.service';

@Component({
  selector: 'create-allocation',
  templateUrl: './create-allocation.component.html',
  styleUrls: ['./create-allocation.component.scss']
})
export class CreateAllocationComponent implements OnInit{

  mainFundCashData!: any[];
  sageBankAccountData!: any[];
  percentage: number[]= [];
  currencySymbols: string[];
  totalDistributedAmount: number =0;
  distributedAmount;
  difference;
  index:number;

  // sorting and pagination variables
  sort: number =0;
  pageNo: number = 0;
  searchText: string = '';
  pagins!: number;

  constructor(private treasuryService: TreasuryService) { }
  
  ngOnInit(): void {
    this.getMainFundData();
    this.getSageBanksAccountsData();
   
  }

  getMainFundData(){
    this.treasuryService.getMainFundCash().subscribe(response => {
      console.log("createallocation===>>>>", response)

      if(response){
        this.mainFundCashData = response.data.cash;
        this.distributedAmount = new Array(this.mainFundCashData.length).fill('0000');
        this.difference = new Array(this.mainFundCashData.length).fill('0000');
      }
    })

  }

  getSageBanksAccountsData(){
    this.treasuryService.getSageBanksAccounts().subscribe(response =>{
      console.log("createallocation sage bank account ===>>>>", response)

      if(response){
        this.sageBankAccountData = response.data;
      }
    })

  }


  sortByAccountName(){

  }
  sortByAccountNo(){

  }

  sortByAmount(){

  }

  sortByCurrency(){

  }

  mainfundamount: number;
  i: number;
  onInputChage(event: any, index){
    let amount = Number(event.target.value);
    this.mainFundCashData.forEach(_ => {
      if(_.currency[0].lookupName == 
          this.sageBankAccountData[index].currency[0].lookupName){
            this.index = this.mainFundCashData.indexOf(_);

            // calculate percentage with main current amount
            console.log("his.mainFundCashData[index].amount", this.mainFundCashData[index].amount)
            this.mainfundamount = this.mainFundCashData[index].amount;
            this.percentage[index] =  (amount/ this.mainfundamount) * 100

            this.distributedAmount[index] = amount.toString();

            // calculate difference
            this.difference[index]= (this.mainfundamount - amount).toString();

            if( amount > this.mainfundamount){
              alert("input value cannot exceed the current amount")
            }
            
            this.totalDistributedAmount += Number(this.distributedAmount[index]);

            if(this.payload.mainFundAlocationOrderDetails.length == 0){
              this.allocationOrderDetails.sageBankID = this.sageBankAccountData[index].sageBankId;
                  this.allocationOrderDetails.distributedAmount = amount;
                  this.allocationOrderDetails.distributedPercentage = this.percentage[index];
                  this.allocationOrderDetails.currencyId = this.sageBankAccountData[index].currencyID;
                  this.allocationOrderDetails.accountTypeId = this.sageBankAccountData[index].sageBankId
                  this.payload.totalAmountDistibuted = this.totalDistributedAmount;
                  this.payload.mainFundAlocationOrderDetails.push(this.allocationOrderDetails);
                  console.log("====>>>>> payload ",this.payload)
            }

            this.payload.mainFundAlocationOrderDetails.forEach(element => {
              if(this.payload.mainFundAlocationOrderDetails[this.payload.mainFundAlocationOrderDetails.length - 1].sageBankID != this.sageBankAccountData[index].sageBankId){
                this.allocationOrderDetails.distributedAmount = amount;
                this.allocationOrderDetails.distributedPercentage = this.percentage[index];
                this.allocationOrderDetails.currencyId = this.sageBankAccountData[index].currencyID;
                this.allocationOrderDetails.accountTypeId = this.sageBankAccountData[index].sageBankId
                this.payload.totalAmountDistibuted = this.totalDistributedAmount;
                this.payload.mainFundAlocationOrderDetails.push(this.allocationOrderDetails);
                console.log("====>>>>> payload ",this.payload)
              }
            });
            };
    })

  }

  payload: AllocationOrder = {
    totalAmountDistibuted:0,
    mainFundAlocationOrderDetails:[]
  };
  allocationOrderDetails: AllocationOrderDetail={
    sageBankID: 0,
    distributedAmount: 0,
    distributedPercentage: 0,
    currencyId: 0,
    accountTypeId: 0
  };

    createAllocationOrder(){
      console.log("====>>>>> payload ",this.payload)
      const formdata = new FormData();
      formdata.append('totalAmountDistibuted',  JSON.stringify( this.payload.totalAmountDistibuted));
      formdata.append('mainFundAlocationOrderDetails',   JSON.stringify(this.payload.mainFundAlocationOrderDetails));
      this.treasuryService.createAllocationOrders(formdata).subscribe(res =>{
      
      
        console.log(res)
      })
    }



}


export interface AllocationOrder{
  totalAmountDistibuted: number,
  mainFundAlocationOrderDetails: AllocationOrderDetail[]


}

export interface AllocationOrderDetail{
  [x: string]: number;
  sageBankID: number,
  distributedAmount: number,
  distributedPercentage: number,
  currencyId: number,
  accountTypeId: number

}



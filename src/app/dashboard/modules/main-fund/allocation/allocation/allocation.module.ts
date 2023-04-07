import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { allocationRoutingModule } from './allocation-routing.module';
import { ViewAllocationComponent } from './view-allocation/view-allocation.component';
import { CashDepositModalComponent } from './cash-deposit-modal/cash-deposit-modal.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { DespositChequeComponent } from './desposit-cheque/desposit-cheque.component';
import { mainfundAllocationComponent } from './allocation.component';

@NgModule({
  declarations: [
    mainfundAllocationComponent,
    ViewAllocationComponent,
    CashDepositModalComponent,
    ViewImageComponent,
    DespositChequeComponent,
  ],
  imports: [
    CommonModule,
    allocationRoutingModule,
    SharedModule
  ],
})
export class allocationModule {}

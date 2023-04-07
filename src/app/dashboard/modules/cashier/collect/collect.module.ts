import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectRoutingModule } from './collect-routing.module';
import { CollectComponent } from './collect.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CollectDetailsComponent } from './collect-details/collect-details.component';
import { SpareComponent } from './components/spare/spare.component';
import { LaborComponent } from './components/labor/labor.component';
import { SubletComponent } from './components/sublet/sublet.component';
import { SparePartsComponent } from './components/spare-parts/spare-parts.component';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { ChequeComponent } from './modal-payment/cheque/cheque.component';
import { AccountComponent } from './modal-payment/account/account.component';
import { VisaComponent } from './modal-payment/visa/visa.component';
import { ModalPayDoneComponent } from './modal-payment/modal-pay-done/modal-pay-done.component';
import { MasterComponent } from './modal-payment/master/master.component';
import { ExpressComponent } from './modal-payment/express/express.component';
import { ModalNeedmodifyComponent } from './components/modal-needmodify/modal-needmodify.component';

@NgModule({
  declarations: [
    CollectComponent,
    CollectDetailsComponent,
    SpareComponent,
    LaborComponent,
    SubletComponent,
    SparePartsComponent,
    ModalPaymentComponent,
    ChequeComponent,
    AccountComponent,
    VisaComponent,
    ModalPayDoneComponent,
    MasterComponent,
    ExpressComponent,
    ModalNeedmodifyComponent,
  ],
  imports: [CommonModule, CollectRoutingModule, SharedModule],
})
export class CollectModule {}

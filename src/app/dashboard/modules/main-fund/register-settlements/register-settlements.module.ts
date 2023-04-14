import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSettlementsRoutingModule } from './register-settlements-routing.module';
import { RegSettlementComponent } from './reg-settlement/reg-settlement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettelComponent } from './settel/settel.component';
import { SessionCardPaymentsComponent } from './components/session-card-payments/session-card-payments.component';
import { SessionChequesComponent } from './components/session-cheques/session-cheques.component';


@NgModule({
  declarations: [
    RegSettlementComponent,
    SettelComponent,
    SessionCardPaymentsComponent,
    SessionChequesComponent
  ],
  imports: [
    CommonModule,
    RegisterSettlementsRoutingModule,
    SharedModule,
  ]
})
export class RegisterSettlementsModule { }

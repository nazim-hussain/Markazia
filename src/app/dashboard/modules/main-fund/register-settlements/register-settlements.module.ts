import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSettlementsRoutingModule } from './register-settlements-routing.module';
import { RegSettlementComponent } from './reg-settlement/reg-settlement.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegSettlementComponent
  ],
  imports: [
    CommonModule,
    RegisterSettlementsRoutingModule,
    SharedModule,
  ]
})
export class RegisterSettlementsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSettlementsRoutingModule } from './register-settlements-routing.module';
import { RegSettlementComponent } from './reg-settlement/reg-settlement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettelComponent } from './settel/settel.component';


@NgModule({
  declarations: [
    RegSettlementComponent,
    SettelComponent
  ],
  imports: [
    CommonModule,
    RegisterSettlementsRoutingModule,
    SharedModule,
  ]
})
export class RegisterSettlementsModule { }

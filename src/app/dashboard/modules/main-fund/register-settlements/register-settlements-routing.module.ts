import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegSettlementComponent } from './reg-settlement/reg-settlement.component';

const routes: Routes = [
  { path: '', component: RegSettlementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterSettlementsRoutingModule { }

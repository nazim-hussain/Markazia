import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegSettlementComponent } from './reg-settlement/reg-settlement.component';
import { SettelComponent } from './settel/settel.component';

const routes: Routes = [
  { path: '', component: RegSettlementComponent },
  { path: 'settle/:sessionId', component: SettelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterSettlementsRoutingModule { }

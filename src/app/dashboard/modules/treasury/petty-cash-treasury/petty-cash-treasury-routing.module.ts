import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { PettyCashTreasuryComponent } from './petty-cash-treasury.component';

const routes: Routes = [
  { path: '', component: PettyCashTreasuryComponent },
  { path: 'request-details/:id/:id2', component: RequestDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PettyCashTreasuryRoutingModule {}

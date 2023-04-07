import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainfundAllocationComponent } from './allocation.component';
import { DespositChequeComponent } from './desposit-cheque/desposit-cheque.component';
import { ViewAllocationComponent } from './view-allocation/view-allocation.component';

const routes: Routes = [
  { path: '', component: mainfundAllocationComponent },
  { path: 'view-allocation/:id', component: ViewAllocationComponent },
  { path: 'desposit-cheque', component: DespositChequeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class allocationRoutingModule {}

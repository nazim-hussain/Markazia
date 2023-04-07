import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectDetailsComponent } from './collect-details/collect-details.component';
import { CollectComponent } from './collect.component';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';

const routes: Routes = [
  { path: '', component: CollectComponent },
  { path: 'details/:type/:id', component: CollectDetailsComponent },
  { path: 'payment', component: ModalPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectRoutingModule {}

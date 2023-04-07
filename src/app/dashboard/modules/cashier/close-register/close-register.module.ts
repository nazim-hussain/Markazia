import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseRegisterRoutingModule } from './close-register-routing.module';
import { CloseRegisterComponent } from './close-register.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CollectChequeComponent } from './components/collect-cheque/collect-cheque.component';
import { CollectCardComponent } from './components/collect-card/collect-card.component';
import { ModalEditCardComponent } from './components/modal-edit-card/modal-edit-card.component';
import { ModalCloseComponent } from './components/modal-close/modal-close.component';

@NgModule({
  declarations: [
    CloseRegisterComponent,
    ModalEditComponent,
    CollectChequeComponent,
    CollectCardComponent,
    ModalEditCardComponent,
    ModalCloseComponent,
  ],
  imports: [CommonModule, CloseRegisterRoutingModule, SharedModule],
})
export class CloseRegisterModule {}

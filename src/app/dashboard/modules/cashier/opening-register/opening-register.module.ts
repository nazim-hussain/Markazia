import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningRegisterRoutingModule } from './opening-register-routing.module';
import { OpeningRegisterComponent } from './opening-register.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalMsgComponent } from './modal-msg/modal-msg.component';

@NgModule({
  declarations: [OpeningRegisterComponent, ModalMsgComponent],
  imports: [CommonModule, OpeningRegisterRoutingModule, SharedModule],
})
export class OpeningRegisterModule {}

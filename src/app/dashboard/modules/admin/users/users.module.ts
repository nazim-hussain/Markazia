import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AdduserComponent } from './adduser/adduser.component';
import { ModalDoneComponent } from '../branches/modal-done/modal-done.component';
import { ModalConfirmComponent } from '../branches/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdduserComponent,
    ModalDoneComponent,
    ModalConfirmComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}

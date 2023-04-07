import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistersRoutingModule } from './registers-routing.module';
import { RegistersComponent } from './registers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddRegisterAndSetupComponent } from './add-register-and-setup/add-register-and-setup.component';
import { AddregisterComponent } from './addregister/addregister.component';
import { RegDoneComponent } from './reg-done/reg-done.component';
import { RegConfirmComponent } from './reg-confirm/reg-confirm.component';

@NgModule({
  declarations: [
    RegistersComponent,
    AddRegisterAndSetupComponent,
    AddregisterComponent,
    RegDoneComponent,
    RegConfirmComponent,
  ],
  imports: [CommonModule, RegistersRoutingModule, SharedModule],
})
export class RegistersModule {}

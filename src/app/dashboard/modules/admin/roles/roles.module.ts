import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { ConfirmRoleComponent } from './confirm-role/confirm-role.component';
import { RoleDoneComponent } from './role-done/role-done.component';

@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent,
    ConfirmRoleComponent,
    RoleDoneComponent,
  ],
  imports: [CommonModule, RolesRoutingModule, SharedModule],
})
export class RolesModule {}

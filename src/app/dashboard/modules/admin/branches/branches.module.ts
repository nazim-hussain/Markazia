import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddBranchComponent } from './add-branch/add-branch.component';


@NgModule({
  declarations: [
    BranchesComponent,AddBranchComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    SharedModule
  ]
})
export class BranchesModule { }

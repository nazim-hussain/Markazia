import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllocationRoutingModule } from './allocation-routing.module';
import { AllocationComponent } from './allocation.component';
import { MainFundComponent } from './components/main-fund/main-fund.component';
import { SharedModule } from "../../../../shared/shared.module";
import { CreateAllocationComponent } from './components/create-allocation/create-allocation.component';


@NgModule({
    declarations: [
        AllocationComponent,
        MainFundComponent,
        CreateAllocationComponent
    ],
    imports: [
        CommonModule,
        AllocationRoutingModule,
        SharedModule
    ]
})
export class AllocationModule { }

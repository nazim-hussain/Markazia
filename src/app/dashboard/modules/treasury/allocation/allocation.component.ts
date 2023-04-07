import { Component, OnInit } from '@angular/core';
import { TreasuryService } from '../petty-cash-treasury/services/treasury.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss'],
})
export class AllocationComponent {
  constructor(
    public headerService: HeaderService,
    public treasuryService: TreasuryService
  ) {}

  iscreateAllocation: boolean;
  selected: number = 1;
  goToPage(value) {
    this.selected = value;
  }

  createAlocation() {
    this.iscreateAllocation = true;
  }
}

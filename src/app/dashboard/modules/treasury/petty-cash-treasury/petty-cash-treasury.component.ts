import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../../services/header.service';
import { TreasuryService } from './services/treasury.service';

@Component({
  selector: 'app-petty-cash-treasury',
  templateUrl: './petty-cash-treasury.component.html',
  styleUrls: ['./petty-cash-treasury.component.scss'],
})
export class PettyCashTreasuryComponent implements OnInit {
  constructor(public headerService: HeaderService, public treasuryService: TreasuryService) {}

  ngOnInit(): void {
    this.headerService.setTitle('Petty Cash');

  }
  selected: number = 1;

  goToPage(value) {
    this.selected = value;

    if (value == 1) {
      this.headerService.setTitle('Petty Cash > Petty Cash Request');
      this.treasuryService.pettyCashRequest$.next('PettyCashRequest')
    } else {
      this.headerService.setTitle('Petty Cash > Petty Cash Setup');
      this.treasuryService.pettyCashRequest$.next('PettyCashSetup')
    }
    // Petty Cash > Petty Cash Requeste
  }
}

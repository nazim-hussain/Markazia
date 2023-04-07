import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvideExpensesComponent } from './provide-expenses.component';
import { provideExpensesRoutingModule } from './provide-expenses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProvideExpensesModalComponent } from './provide-expenses-modal/provide-expenses-modal/provide-expenses-modal.component';

@NgModule({
  declarations: [ProvideExpensesComponent, ProvideExpensesModalComponent],
  imports: [CommonModule, provideExpensesRoutingModule, SharedModule],
})
export class provideExpensesModule {}

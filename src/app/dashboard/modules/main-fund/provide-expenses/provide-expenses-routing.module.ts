import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvideExpensesComponent } from './provide-expenses.component';

const routes: Routes = [{ path: '', component: ProvideExpensesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class provideExpensesRoutingModule {}

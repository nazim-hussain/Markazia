import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/branches', pathMatch: 'full' },
  // { path: '', redirectTo: '/opening-register', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'branches',
        loadChildren: () =>
          import('./modules/admin/branches/branches.module').then(
            (m) => m.BranchesModule
          ),
      },
      {
        path: 'branches',
        loadChildren: () =>
          import('./modules/admin/branches/branches.module').then(
            (m) => m.BranchesModule
          ),
      },
      {
        path: 'registers',
        loadChildren: () =>
          import('./modules/admin/registers/registers.module').then(
            (m) => m.RegistersModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./modules/admin/roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'opening-register',
        loadChildren: () =>
          import(
            './modules/cashier/opening-register/opening-register.module'
          ).then((m) => m.OpeningRegisterModule),
      },
      {
        path: 'close-register',
        loadChildren: () =>
          import('./modules/cashier/close-register/close-register.module').then(
            (m) => m.CloseRegisterModule
          ),
      },
      {
        path: 'collect',
        loadChildren: () =>
          import('./modules/cashier/collect/collect.module').then(
            (m) => m.CollectModule
          ),
      },
      {
        path: 'petty-cash',
        loadChildren: () =>
          import('./modules/cashier/petty-cash/petty-cash.module').then(
            (m) => m.PettyCashModule
          ),
      },
      {
        path: 'provide-expenses',
        loadChildren: () =>
          import(
            './modules/main-fund/provide-expenses/provide-expenses.module'
          ).then((m) => m.provideExpensesModule),
      },
      {
        path: 'mainFund-allocation',
        loadChildren: () =>
          import(
            './modules/main-fund/allocation/allocation/allocation.module'
          ).then((m) => m.allocationModule),
      },
      {
        path: 'register-settlements',
        loadChildren: () =>
          import(
            './modules/main-fund/register-settlements/register-settlements.module')
            .then((m) => m.RegisterSettlementsModule)
      },
      // ========= Treasury  ========================================================
      {
        path: 'allocation',
        loadChildren: () =>
          import('./modules/treasury/allocation/allocation.module').then(
            (m) => m.AllocationModule
          ),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/treasury/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'transactions-history',
        loadChildren: () =>
          import(
            './modules/treasury/transactions-history/transactions-history.module'
          ).then((m) => m.TransactionsHistoryModule),
      },
      {
        path: 'pettycash',
        loadChildren: () =>
          import(
            './modules/treasury/petty-cash-treasury/petty-cash-treasury.module'
          ).then((m) => m.PettyCashTreasuryModule),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

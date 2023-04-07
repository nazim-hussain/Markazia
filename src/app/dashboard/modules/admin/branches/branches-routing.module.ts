import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchesComponent } from './branches.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [],
  },
  { path: 'addbranch', component: AddBranchComponent },
  { path: 'viewbranch/:id', component: AddBranchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}

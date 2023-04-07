import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRegisterAndSetupComponent } from './add-register-and-setup/add-register-and-setup.component';
import { RegistersComponent } from './registers.component';

const routes: Routes = [
  { path: '', component: RegistersComponent },
  { path: 'add-register', component: AddRegisterAndSetupComponent },
  { path: 'view-register/:id', component: AddRegisterAndSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistersRoutingModule {}

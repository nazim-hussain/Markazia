import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseRegisterComponent } from './close-register.component';

const routes: Routes = [{ path: '', component: CloseRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseRegisterRoutingModule { }

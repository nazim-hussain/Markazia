import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningRegisterComponent } from './opening-register.component';

const routes: Routes = [{ path: '', component: OpeningRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningRegisterRoutingModule { }

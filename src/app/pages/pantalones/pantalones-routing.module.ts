import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantalonesPage } from './pantalones.page';

const routes: Routes = [
  {
    path: '',
    component: PantalonesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantalonesPageRoutingModule {}
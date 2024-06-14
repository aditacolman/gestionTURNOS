import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPPage } from './editar-p.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPPageRoutingModule {}

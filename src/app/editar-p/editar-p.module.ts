import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPPageRoutingModule } from './editar-p-routing.module';

import { EditarPPage } from './editar-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPPageRoutingModule
  ],
  declarations: [EditarPPage]
})
export class EditarPPageModule {}

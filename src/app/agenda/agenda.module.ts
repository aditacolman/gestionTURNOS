import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AgendaPage } from './agenda.page';
import { PopoverContentComponent } from '../popover-content/popover-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgendaPage
      }
    ])
  ],
  declarations: [AgendaPage, PopoverContentComponent]
})
export class AgendaPageModule {}

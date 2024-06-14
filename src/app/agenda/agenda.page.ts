import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverContentComponent } from '../popover-content/popover-content.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {
  selectedDate: string = '';

  constructor(public popoverController: PopoverController) {}

  async dateSelected(event: any) {
    this.selectedDate = event.detail.value;

    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      componentProps: { date: this.selectedDate },
      translucent: true,
      backdropDismiss: true, // Esto permite que el popover se cierre al hacer clic fuera
      cssClass: 'custom-popover',
    });
    await popover.present();
  }
}
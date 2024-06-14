import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

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
      component: 'div',
      componentProps: {
        date: this.selectedDate
      },
      translucent: true,
      cssClass: 'custom-popover'
    });
    await popover.present();
  }
}

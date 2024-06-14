import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover-content',
  template: `
    <ion-list>
      <ion-avatar>
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-item>
        <ion-label>Date: {{ date }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Additional Info</ion-label>
      </ion-item>
      <!-- Agrega más elementos según tu información -->
    </ion-list>
  `,
})
export class PopoverContentComponent {
  @Input() date: string = '';

  constructor() {}
}

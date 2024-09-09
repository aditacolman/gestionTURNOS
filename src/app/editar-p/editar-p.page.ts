import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-p',
  templateUrl: './editar-p.page.html',
  styleUrls: ['./editar-p.page.scss'],
})
export class EditarPPage implements OnInit {
  
  constructor(
    public popoverController: PopoverController,
    private navCtrl: NavController // Agregamos NavController
  ) {}

  ngOnInit() {
  }

  volverAtras() {
    this.navCtrl.back();
  }
}

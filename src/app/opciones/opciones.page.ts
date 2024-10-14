import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  constructor(
    private navCtrl: NavController // Agregamos NavController

  ) { }

  ngOnInit() {
  }

  volverAtras() {
    this.navCtrl.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})
export class ListadoClientesPage implements OnInit {

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {
  }

  volverAtras() {
    this.navCtrl.back();
  }
}

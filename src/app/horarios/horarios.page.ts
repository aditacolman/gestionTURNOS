import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  constructor(private navCtrl: NavController) { 
  }

  ngOnInit() {
  }

  volverAtras() {
    this.navCtrl.back();
  }

}

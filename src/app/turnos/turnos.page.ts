import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.page.html',
  styleUrls: ['./turnos.page.scss'],
})



export class TurnosPage implements OnInit {

  turnos=[];

  constructor(private servicio: ApiService,
    private navCtrl: NavController // Agregamos NavController
  ) {}

  traerTurnos(){
    this.servicio.traer_turnos().subscribe(respuesta=>{
      console.log(respuesta)
      this.turnos = respuesta
    })

  
  }


  ngOnInit() {
    this.traerTurnos()

  }
    // Método para volver a la pantalla anterior
  volverAtras() {
      this.navCtrl.back();
    }

}

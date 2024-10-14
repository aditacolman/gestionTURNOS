import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})

export class TrabajadoresPage implements OnInit {
  
  trabajadores =[];

  constructor(private servicio:ApiService,
    private navCtrl: NavController // Agregamos NavController
  ) {}

  traerTurnos(){
    this.servicio.traer_turnos().subscribe(respuesta=>{
      console.log(respuesta)
      this.trabajadores = respuesta
    })

  
  }

  ngOnInit() {
    this.traerTurnos()
  }

  volverAtras() {
    this.navCtrl.back();
  }

}

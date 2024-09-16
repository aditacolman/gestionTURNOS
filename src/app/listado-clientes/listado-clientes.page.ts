import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})


export class ListadoClientesPage implements OnInit {

  clientes =[];

  constructor(private  servicio: ApiService, 
    private navCtrl: NavController ) { }

  traerDatos(){
    this.servicio.traer_clientes().subscribe(respuesta=>{
      console.log(respuesta)
      this.clientes = respuesta
    })

  
  }

  ngOnInit() {
    this.traerDatos()
  }

  volverAtras() {
    this.navCtrl.back();
  }
}

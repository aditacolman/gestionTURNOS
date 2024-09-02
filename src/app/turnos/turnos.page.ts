import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.page.html',
  styleUrls: ['./turnos.page.scss'],
})



export class TurnosPage implements OnInit {

  turnos=[];
  clientes=[];

  constructor(private servicio: ApiService) { }

  traerDatos(){
    this.servicio.traer_clientes().subscribe(respuesta=>{
      console.log(respuesta)
      this.clientes = respuesta
    })
  
  }


  ngOnInit() {
    this.traerDatos()

  }

}

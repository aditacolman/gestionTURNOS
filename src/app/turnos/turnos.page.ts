import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.page.html',
  styleUrls: ['./turnos.page.scss'],
})



export class TurnosPage implements OnInit {

  turnos=[];
  constructor(private servicio: ApiService) { }

  traerDatos(){
    this.servicio.traer_turnos().subscribe(respuesta=>{
      console.log(respuesta)
      this.turnos = respuesta
    })
  
  }

  ngOnInit() {
    this.traerDatos()
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent implements OnInit {

  @Input() date?: string; 

  turnos: any[] = []; 
  turnosFiltrados: any[] = []; 

  constructor(private servicio: ApiService) {}

  ngOnInit() {
    console.log("Popover content init");


    this.servicio.traer_turnos().subscribe(respuesta => {
      console.log("Turnos obtenidos:", respuesta);
      this.turnos = respuesta;

   
      if (this.date) {
        this.filtrarTurnosPorFecha(this.date);
      }
    });
  }


  filtrarTurnosPorFecha(_fechaSeleccionada: string) {
    console.log(_fechaSeleccionada)
    let fecha_sola = _fechaSeleccionada.split("T")[0]
    console.log(fecha_sola)
    this.turnosFiltrados = this.turnos.filter(turno => {
      console.log(turno)
      const fechaSeleccionada = turno.Fecha;
      return fecha_sola == turno.Fecha;
    });

    console.log("Turnos filtrados:", this.turnosFiltrados);
  }
}

import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';


interface Turno {
  Nombre_Cliente: string;
  Apellido_Cliente: string;
  Fecha: string;
  Hora: string;
  Servicio: string;
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.page.html',
  styleUrls: ['./turnos.page.scss'],
})

export class TurnosPage implements OnInit {

  Turnos: Turno[] = [];
  searchTerm: string = '';
  filteredTurnos: Turno[] = [];
  selectedFilter: string = 'nombre'; 


  constructor(private servicio: ApiService, 
    private navCtrl: NavController ) { } // Agregamos NavController


  traerTurnos(){
    this.servicio.traer_turnos().subscribe(respuesta=>{
      console.log(respuesta)
      this.Turnos = respuesta;
      this.filteredTurnos = respuesta; // Inicializa la lista filtrada
    })
  }

  ngOnInit() {
    this.traerTurnos()
  }
  
    // Método para filtrar los trabajadores según el término de búsqueda
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTurnos = this.Turnos.filter(turno => {
      // Siempre busca en Nombre y Apellido
      return turno.Nombre_Cliente.toLowerCase().includes(searchTermLower) ||
      turno.Apellido_Cliente.toLowerCase().includes(searchTermLower);
      });
    }
  
    // Método para actualizar el filtro seleccionado (no lo usamos en la búsqueda actual)
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    }

  volverAtras() {
    this.navCtrl.back();
  }
}
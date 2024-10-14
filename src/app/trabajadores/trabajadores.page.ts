import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

interface Trabajador {
  Nombre: string;
  Apellido: string;
  Telefono: string;
  // Agrega otras propiedades si es necesario
}

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})

export class TrabajadoresPage implements OnInit {

  Trabajadores: Trabajador[] = [];
  searchTerm: string = '';
  filteredTrabajadores: Trabajador[] = [];
  selectedFilter: string = 'nombre'; // Filtro por defecto

  constructor(private navCtrl: NavController, private Service: ApiService) {}

  traerTrabajadores() {
    this.Service.traerTrabajadores().subscribe(respuesta => {
      console.log(respuesta);
      this.Trabajadores = respuesta;
      this.filteredTrabajadores = respuesta; // Inicializa la lista filtrada
    });
  }

  ngOnInit() {
    this.traerTrabajadores();
  }

  volverAtras() {
    this.navCtrl.back();
  }

  // Método para filtrar los trabajadores según el término de búsqueda
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTrabajadores = this.Trabajadores.filter(trabajador => {
      // Siempre busca en Nombre y Apellido
      return trabajador.Nombre.toLowerCase().includes(searchTermLower) ||
             trabajador.Apellido.toLowerCase().includes(searchTermLower);
    });
  }

  // Método para actualizar el filtro seleccionado (no lo usamos en la búsqueda actual)
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    // Aquí podrías agregar lógica adicional si decides usar el filtro de manera diferente
  }
}

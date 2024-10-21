import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';


interface Cliente {
  Nombre: string;
  Apellido: string;
  Telefono: string;
}

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})

export class ListadoClientesPage implements OnInit {

  Clientes: Cliente[] = [];
  searchTerm: string = '';
  filteredClientes: Cliente[] = [];
  selectedFilter: string = 'nombre'; 


  constructor(private  servicio: ApiService, 
    private navCtrl: NavController ) { }

  traerDatos(){
    this.servicio.traer_clientes().subscribe(respuesta=>{
      console.log(respuesta)
      this.Clientes = respuesta;
      this.filteredClientes= respuesta; // Inicializa la lista filtrada
    })
  }

  ngOnInit() {
    this.traerDatos()
    }
  
    // Método para filtrar los trabajadores según el término de búsqueda
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredClientes = this.Clientes.filter(cliente => {
      // Siempre busca en Nombre y Apellido
      return cliente.Nombre.toLowerCase().includes(searchTermLower) ||
      cliente.Apellido.toLowerCase().includes(searchTermLower);
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

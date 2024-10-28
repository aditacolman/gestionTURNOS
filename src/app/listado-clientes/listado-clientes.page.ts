import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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

  @ViewChild(IonModal) modal: IonModal=Object();
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string="";

  Clientes: Cliente[] = [];
  searchTerm: string = '';
  filteredClientes: Cliente[] = [];
  selectedFilter: string = 'nombre'; 


  constructor(private  servicio: ApiService, 
    private navCtrl: NavController ) { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }  

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

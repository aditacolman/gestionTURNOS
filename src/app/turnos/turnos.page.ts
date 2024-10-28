import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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

  @ViewChild(IonModal) modal: IonModal=Object();
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string="";

  Turnos: Turno[] = [];
  searchTerm: string = '';
  filteredTurnos: Turno[] = [];
  selectedFilter: string = 'nombre'; 

  constructor(private servicio: ApiService, private navCtrl: NavController ) { }

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

  traerTurnos() {
    this.servicio.traer_turnos().subscribe(respuesta => {
      console.log(respuesta);
      this.Turnos = respuesta;
      this.filteredTurnos = respuesta; // Inicializa la lista filtrada
    });
  }

  ngOnInit() {
    this.traerTurnos();
  }
  
  // Método para filtrar los turnos según el término de búsqueda en múltiples campos
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTurnos = this.Turnos.filter(turno => {
      return (
        turno.Nombre_Cliente.toLowerCase().includes(searchTermLower) ||
        turno.Apellido_Cliente.toLowerCase().includes(searchTermLower) ||
        turno.Servicio.toLowerCase().includes(searchTermLower) ||
        turno.Hora.includes(searchTermLower) || // No es necesario pasar a minúsculas ya que es un valor numérico
        turno.Fecha.includes(searchTermLower) // Si el formato de fecha es consistente, no necesita minúsculas
      );
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

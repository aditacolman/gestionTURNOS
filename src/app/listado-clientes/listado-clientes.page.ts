import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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

  @ViewChild(IonModal) modal!: IonModal;  // No es necesario inicializarlo con Object()

  name: string = "";
  surname: string = "";
  phone: string = "";
  mail: string = "";
  password: string = "";

  message: string = 'Este es un ejemplo de modal inline en Ionic.';

  Clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  selectedFilter: string = 'nombre';
  searchTerm: string = '';
  

  constructor(
    private servicio: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.traerDatos();
  }

  // Trae los datos de los clientes desde el servicio
  traerDatos() {
    this.servicio.traer_clientes().subscribe(respuesta => {
      console.log(respuesta);
      this.Clientes = respuesta;
      this.filteredClientes = respuesta; // Inicializa la lista filtrada
    });
  }

  enviar_formulario() {
    this.servicio.agregarClientes(this.name, this.surname, this.phone, this.mail, this.password).subscribe(respuesta=>{
      console.log(respuesta)
      
    })
  }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `¡Gracias por registrar a ${this.name}!`;
  
        // Crear cliente y enviarlo al backend
        this.enviar_formulario();
      }
    }

    // Método para cerrar el modal sin guardar
    cancel() {
      this.modal.dismiss(null, 'cancel');
    }
  
    // Método para guardar los datos y cerrar el modal
    confirm() {
      this.modal.dismiss(this.name, 'confirm');
      this.message = `Cliente registrado: ${this.name} ${this.surname}`;
    }

  // Método para filtrar los clientes según el término de búsqueda
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredClientes = this.Clientes.filter(cliente =>
      cliente.Nombre.toLowerCase().includes(searchTermLower) ||
      cliente.Apellido.toLowerCase().includes(searchTermLower)
    );
  }

  // Método para actualizar el filtro seleccionado
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
  }

  // Volver atrás en la navegación
  volverAtras() {
    this.navCtrl.back();
  }

  // Muestra un pop-up de confirmación de eliminación
  async confirmarEliminacion(cliente: Cliente) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar a ${cliente.Nombre} ${cliente.Apellido}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarCliente(cliente); // Llama a la función de eliminación
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para eliminar al cliente
  eliminarCliente(cliente: Cliente) {
    this.Clientes = this.Clientes.filter(c => c !== cliente);
    this.filteredClientes = this.filteredClientes.filter(c => c !== cliente);
    console.log(`Cliente ${cliente.Nombre} ${cliente.Apellido} eliminado`);
  }

}


  
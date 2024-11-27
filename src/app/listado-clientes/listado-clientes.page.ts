import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

interface Cliente {
  Nombre: string;
  Apellido: string;
  Telefono: string;
  ID: number;
  Correo:string;
  Contrasena:string;
}

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})
export class ListadoClientesPage implements OnInit {
  @ViewChild('modalEditar') modalEditar!: IonModal;   // No es necesario inicializarlo con Object()
  @ViewChild('modalAgregar') modalAgregar!: IonModal;  // Referencia para el modal de agregar

  name: string = "";
  surname: string = "";
  phone: string = "";
  mail: string = "";
  password: string = "";    

  nombre: string = "";
  apellido: string = "";
  telefono: string = "";
  correo: string = "";
  contrasena: string = "";

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

  modificarDatosCliente(id:number, nom:string, ape:string, tel:string, correo:string, contrasena:string){
    //const dniAEnviar = this.dniEditar ?? 0;
    
    this.servicio.actualizarDatosCliente(id, nom, ape, tel, correo, contrasena).subscribe(respuesta=>{
     console.log(respuesta)
     location.href = "/listado-clientes"
    });
    
  }

  confirmEditar(id:number, nom:string, ape:string, tel:string, correo:string,contrasena:string) {
    // Si estamos en el modal de editar, confirmar y cerrar el modal de editar
    console.log("editando")
    console.log(this.modalEditar)

      console.log("editar modal")
      //this.modalEditar.dismiss(this.nombre, 'confirm');
      this.message = `Cliente modificado: ${this.nombre} ${this.apellido}`;
      this.modificarDatosCliente(id, nom, ape, tel, correo, contrasena);
      
  }

  cancelEditar() {
    // Cerrar el modal de agregar si está abierto
    if (this.modalEditar) {
      this.modalEditar.dismiss(null, 'cancel');
      console.log("Modal de editar cerrado");
    }
  }

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
      location.href="/listado-clientes"
      
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

    confirmAgregar() {
      // Si estamos en el modal de agregar, confirmar y cerrar el modal de agregar
      if (this.modalAgregar) {
        console.log("agregar modal")
        this.modalAgregar.dismiss(this.name, 'confirm');
        this.message = `Cliente registrado: ${this.name} ${this.surname}`;
        this.enviar_formulario();
      }
    }

    cancelAgregar() {
      // Cerrar el modal de agregar si está abierto
      if (this.modalAgregar) {
        this.modalAgregar.dismiss(null, 'cancel');
        console.log("Modal de agregar cerrado");
      }
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
  async confirmarEliminacion(cliente: any) {
    console.log(cliente)
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
            this.eliminarCliente(cliente.ID); // Llama a la función de eliminación
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para eliminar al cliente
  eliminarCliente(cliente: Cliente) {
    console.log(cliente)
    this.servicio.eliminarCliente(cliente).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        location.href="/listado-clientes"
      },
      (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    );
  }

}


  
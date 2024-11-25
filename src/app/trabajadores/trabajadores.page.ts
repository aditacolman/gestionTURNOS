import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  @ViewChild('modalAgregar') modalAgregar!: IonModal;  // Referencia para el modal de agregar
  @ViewChild('modalEditar') modalEditar!: IonModal;   // No es necesario inicializarlo con Object()

  name: string = "";
  surname: string = "";
  phone: string = "";
  mail: string = "";
  profesion: string = "";
  dni: number | null = null;  
  password: string = "";

  nombre: string = "";
  apellido: string = "";
  telefono: string = "";
  correo: string = "";
  profesionEditar: string = "";
  dniEditar: number | null = null;  
  contrasenaEditar: string = "";

  message: string = 'Este es un ejemplo de modal inline en Ionic.';

  //Trabajadores:Trabajador[] = [];
  Trabajadores:any[] = [];
  searchTerm: string = '';
  filteredTrabajadores: any[] = [];
  selectedFilter: string = 'nombre';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private Service: ApiService,
    private router:Router
  ) {
    
  }

  ngOnInit() {
    this.traerTrabajadores();
  }

  modificarDatosTrabajador(){
    const dniAEnviar = this.dniEditar ?? 0;
    this.Service.actualizarDatosTrabajador(this.nombre, this.apellido, this.profesionEditar, dniAEnviar, this.telefono, this.correo, this.contrasenaEditar).subscribe(respuesta=>{
      console.log(respuesta)
    });
  }

  traerTrabajadores() {
    this.Service.traerTrabajadores().subscribe(respuesta => {
      console.log(respuesta);
      this.Trabajadores = respuesta;
      this.filteredTrabajadores = this.Trabajadores
    });
  }

  enviar_formulario() {
    const dniToSend = this.dni ?? 0;
    this.Service.agregarTrabajadores(this.name, this.surname, this.profesion, this.mail, this.phone, dniToSend, this.password).subscribe(respuesta=>{
      console.log(respuesta)
      location.href="/trabajadores"
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `¡Gracias por registrar a ${this.name}!`;
  
      // Crear cliente y enviarlo al backend
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

  cancelEditar() {
    // Cerrar el modal de agregar si está abierto
    if (this.modalEditar) {
      this.modalEditar.dismiss(null, 'cancel');
      console.log("Modal de editar cerrado");
    }
  }
  
  
  confirmEditar() {
    // Si estamos en el modal de editar, confirmar y cerrar el modal de editar
    if (this.modalEditar) {
      console.log("editar modal")
      this.modalEditar.dismiss(this.nombre, 'confirm');
      this.message = `Cliente modificado: ${this.nombre} ${this.apellido}`;
      this.modificarDatosTrabajador();
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

  volverAtras() {
    this.navCtrl.back();
  }

  onSearch(event: any) {
    const searchTerm = event.detail.value?.toLowerCase() || '';
    this.filteredTrabajadores = this.Trabajadores.filter(item => {
      return item["Nombre"].toLowerCase().includes(searchTerm) || 
      item["Apellido"].toLowerCase().includes(searchTerm)
    });
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
  }

  async confirmarEliminacion(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar a ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarTrabajador(id);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarTrabajador(id: any) {
    this.Service.eliminarTrabajador(id).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        location.href="/trabajadores"
        /*
        this.router.navigateByUrl('/trabajadores', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
        */
      },
      (error) => {
        console.error('Error al eliminar el trabajador:', error);
      }
    );
  }

  // Verificación de si el formulario es válido
  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.surname.trim() !== '' &&
      this.phone.trim() !== '' &&
      this.mail.trim() !== '' &&
      this.profesion.trim() !== '' &&
      this.dni !== null &&
      this.password.trim() !== ''
    );
  }
}

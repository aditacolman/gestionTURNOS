import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
  @ViewChild(IonModal) modal!: IonModal;  // No es necesario inicializarlo con Object()

  name: string = "";
  surname: string = "";
  phone: string = "";
  mail: string = "";
  profesion: string = "";
  dni: number | null = null;  
  password: string = "";

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
  ) {}

  ngOnInit() {
    this.traerTrabajadores();
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.message = `Cliente registrado: ${this.name} ${this.surname}`;
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

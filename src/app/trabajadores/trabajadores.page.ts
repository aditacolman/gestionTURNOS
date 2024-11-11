import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

interface Trabajador {
  id: number; // Asegúrate de tener un ID único para cada trabajador
  Nombre: string;
  Apellido: string;
  Telefono: string;
}

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})

export class TrabajadoresPage implements OnInit {
  //Trabajadores:Trabajador[] = [];
  Trabajadores = [];
  searchTerm: string = '';
  filteredTrabajadores: Trabajador[] = [];
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
      this.filteredTrabajadores = respuesta;
    });
  }

  volverAtras() {
    this.navCtrl.back();
  }

  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    //this.filteredTrabajadores = this.Trabajadores.filter(trabajador =>
      //trabajador.Nombre.toLowerCase().includes(searchTermLower) ||
      //trabajador.Apellido.toLowerCase().includes(searchTermLower)
    //);
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
  }

  async confirmarEliminacion(id:any) {
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
            this.eliminarTrabajador(id); // Llama a la función de eliminación
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarTrabajador(id:any) {
    console.log(id)
    this.Service.eliminarTrabajador(id).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.router.navigateByUrl('/trabajadores', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
        //this.Trabajadores = this.Trabajadores.filter(t => t !== trabajador);
        //this.filteredTrabajadores = this.filteredTrabajadores.filter(t => t !== trabajador);
      },
      (error) => {
        console.error('Error al eliminar el trabajador:', error);
      }
    );
  }
}


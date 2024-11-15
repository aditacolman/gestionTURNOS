import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  name: string = '';
  surname: string = '';
  phone: string = '';
  mail: string = '';
  profesion: string = '';
  dni: number | null = null;
  password: string = '';

  message: string = 'Este es un ejemplo de modal inline en Ionic.';

  constructor(private Service: ApiService) { }

  ngOnInit() {}

  enviar_formulario(form: any) {
    if (form.invalid) {
      return;
    }

    const dniToSend = this.dni ?? 0;
    this.Service.agregarTrabajadores(this.name, this.surname, this.profesion, this.mail, this.phone, dniToSend, this.password)
      .subscribe(respuesta => {
        console.log(respuesta);
      }, error => {
        console.error('Error al enviar formulario', error);
      });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `¡Gracias por registrar a ${this.name}!`;
    }
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
}


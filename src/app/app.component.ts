import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Forzar el tema claro globalmente (no es necesario añadir una clase 'light' si ya lo definiste en el global.scss)
    document.body.classList.remove('dark');  // Asegúrate de eliminar cualquier clase 'dark' si es que existe
    document.body.classList.add('light');   // Forzar el tema claro

    // Configurar la barra de estado en modo claro (puedes cambiar a Style.Dark si prefieres estilo oscuro)
    StatusBar.setStyle({ style: Style.Light });  // Si quieres la barra de estado en estilo claro
  }
}

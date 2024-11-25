import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo = "";
  contrasena = "";
  mensajeError = "";  // Variable para almacenar el mensaje de error

  constructor(private servicio: ApiService, private router: Router) { }

  ngOnInit() {}

  // Método para enviar el formulario
  enviar_formulario() {
    // Primero, verifica si los datos del formulario son correctos
    if (!this.correo.includes('@') || this.contrasena.length < 6) {
      this.mensajeError = "Por favor, ingrese un correo y contraseña válidos.";
      return;
    }

    this.servicio.login_mov(this.correo, this.contrasena).pipe(
      catchError((error) => {
        // Manejo del error si la autenticación falla
        this.mensajeError = "Correo o contraseña incorrectos."; // Mensaje de error
        return of(null); // Devolver un observable vacío
      })
    ).subscribe(respuesta => {

      if (respuesta["resultado"]=="usuario no encontrado"){
        this.mensajeError= respuesta["resultado"]
      }else{
        let id = respuesta["resultado"][0]
        console.log(respuesta["resultado"][0]);
        sessionStorage.setItem("id_usuario", id)
        // Si la respuesta es válida, redirige a la página de inicio
        this.router.navigate(['/tabs/home']);
      }

    });
  }

}

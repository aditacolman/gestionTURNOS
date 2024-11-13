import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "https://gestionturnos.pythonanywhere.com/";

  constructor(private http: HttpClient) {}

  traer_turnos() {
    return this.http.get<[]>(this.url + "verTurnos");
  }

  traer_clientes() {
    return this.http.get<[]>(this.url + "verClientes");
  }

  traer_turno_cliente(id_cliente: number) {
    return this.http.get(this.url + `verTurnoCliente/${id_cliente}`);
  }

  nuevo_turno(datos: any) {
    return this.http.post(this.url + "agregarTurno", datos);
  }

  eliminar_turno(id: number) {
    return this.http.delete(this.url + "eliminarTurno/" + id);
  }

  actualizar_turno(id: number, datos: any) {
    return this.http.put(this.url + "actualizarDatosTurno/" + id, datos);
  }

  traerTrabajadores() {
    return this.http.get<[]>(this.url + "verTrabajadores");
  }

  // Método para eliminar un trabajador por ID
  eliminarTrabajador(id: any) {
    return this.http.delete(this.url + "eliminarTrabajador/" + id);
  }

  login_mov(Correo: string, Contrasena: string) {
    let datos = {
      "Correo": Correo,
      "Contrasena": Contrasena
    };
    return this.http.post(this.url + "login_mov", datos);
  }

  // Método para agregar un nuevo cliente
  agregarClientes(Nombre:string, Apellido:string, Telefono:string, Correo:string, Contrasena:string) {

    let datos ={
      "Nombre": Nombre,
      "Apellido": Apellido,
      "Telefono": Telefono,
      "Correo": Correo,
      "Contrasena": Contrasena
    }

    return this.http.post(this.url + "agregarClientes", datos);  // Aquí "agregarCliente" sería la ruta en tu backend para crear un cliente.
    }

      // Método para agregar un nuevo cliente
    agregarTrabajadores(Nombre:string, Apellido:string, Profesion:string, Correo:string, Telefono:string, DNI:number, Contrasena:string) {

    let datos ={
      "Nombre": Nombre,
      "Apellido": Apellido,
      "Profesion": Profesion,
      "Correo": Correo,
      "Telefono": Telefono,
      "DNI": DNI,
      "Contrasena": Contrasena
    }

    return this.http.post(this.url + "agregarTrabajadores", datos); 
    }
  }

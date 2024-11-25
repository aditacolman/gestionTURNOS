import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "https://gestionturnos.pythonanywhere.com/";

  constructor(private http: HttpClient) {}

  // Método para hacer login
  login_mov(Correo: string, Contrasena: string): Observable<any> {
    let datos = {
      "Correo": Correo,
      "Contrasena": Contrasena
    };
    return this.http.post(this.url + "login_mov", datos);
  }

  // Otros métodos para interactuar con la API

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

  eliminarTurno(id: any) {
    return this.http.delete(this.url + "eliminarTurno/" + id);
  }

  actualizar_turno(id: number, datos: any) {
    return this.http.put(this.url + "actualizarDatosTurno/" + id, datos);
  }

  traerTrabajadores() {
    return this.http.get<[]>(this.url + "verTrabajadores");
  }

  eliminarTrabajador(id: any) {
    return this.http.delete(this.url + "eliminarTrabajador/" + id);
  }

  eliminarCliente(id: any) {
    return this.http.delete(this.url + "eliminarCliente/" + id);
  }

<<<<<<< HEAD
  login_mov(Correo: string, Contrasena: string) {
    let datos = {
      "Correo": Correo,
      "Contrasena": Contrasena
    };
    return this.http.post(this.url + "login_mov", datos);
  }

  actualizarDatosTrabajador(Nombre:string, Apellido:string, Profesion:string, Telefono:string, Correo:string, Contrasena:string){
  let datos ={
    "Nombre": Nombre,
    "Apellido": Apellido,
    "Profesion": Profesion,
    "Telefono": Telefono,
    "Correo": Correo,
    "Contrasena": Contrasena
  }

  return this.http.put(this.url + "actualizarDatosTrabajador", datos);  // Aquí "agregarCliente" sería la ruta en tu backend para crear un cliente.
  }

  // Método para agregar un nuevo cliente
=======
>>>>>>> df0a488d4bc20807edb8aa4430199e71968fd834
  agregarClientes(Nombre:string, Apellido:string, Telefono:string, Correo:string, Contrasena:string) {
    let datos ={
      "Nombre": Nombre,
      "Apellido": Apellido,
      "Telefono": Telefono,
      "Correo": Correo,
      "Contrasena": Contrasena
    }
    return this.http.post(this.url + "agregarClientes", datos);
  }

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

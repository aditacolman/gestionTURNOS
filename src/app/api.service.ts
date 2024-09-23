import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "https://gestionturnos.pythonanywhere.com/"

  constructor(private http:HttpClient) {

  }

  traer_turnos(){
    return this.http.get<[]>(this.url + "verTurnos") 
  }

  traer_clientes(){
    return this.http.get<[]>(this.url + "verClientes") 
  }

  traer_turno_cliente(id_cliente:number){
    return this.http.get(this.url + "")
  }

  nuevo_turno(datos:any){
    return this.http.post(this.url + "agregarTurno", datos)
  }

  eliminar_turno(id:number){
    return this.http.delete(this.url + "eliminarTurno/" + id)
  }

  actualizar_turno(id:number, datos:any){
    return this.http.put(this.url  + "actualizarDatosTurno/" + id, datos)
  }

  login_mov (Correo:string, Contrasena:string){

    let datos ={
      "Correo": Correo,
      "Contrasena": Contrasena
    }

    return this.http.post(this.url  + "login_mov", datos)
  }


}

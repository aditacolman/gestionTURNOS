import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
<<<<<<< HEAD
  url = "http://gestionturnos.pythonanywhere.com/"

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


=======
  url='https:/gestionturnos.pythonanywhere.com/';

  constructor(private http:HttpClient) {}
  
  agregar_cliente(datos:any){
    return this.http.post(this.url+ 'agregarClientes',datos);
  }
  
  traer_clientes(){
    return this.http.get<[]>(this.url+'verClientes');
  }  
>>>>>>> bcd0140611b68d209aa06ced081ae7a52f63ff4f
}

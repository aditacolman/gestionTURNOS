import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url='https:/gestionturnos.pythonanywhere.com/';

  constructor(private http:HttpClient) {}
  
  agregar_cliente(datos:any){
    return this.http.post(this.url+ 'agregarClientes',datos);
  }
  
  traer_clientes(){
    return this.http.get<[]>(this.url+'verClientes');
  }  
}

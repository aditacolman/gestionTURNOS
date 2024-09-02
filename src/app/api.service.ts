import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "http://gestionturnos.pythonanywhere.com/"

  constructor(private http:HttpClient) {

  }

  traer_turnos(){
    return this.http.get<[]>(this.url + "verTurnos") 
  }
}

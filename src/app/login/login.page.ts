import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo=""
  contrasena=""

  constructor(private  servicio: ApiService) { }

  iniciar_sesion_mov(){
  
  }

  ngOnInit() {
  }

  enviar_formulario() {
    this.servicio.login_mov(this.correo, this.contrasena).subscribe(respuesta=>{
      console.log(respuesta)
    
    })
  }

}

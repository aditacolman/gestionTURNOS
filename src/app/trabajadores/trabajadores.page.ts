import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {

  Trabajadores=[]

  constructor(private navCtrl:NavController,
    private Service:ApiService) {
      

   }

   traerTrabajadores(){
    this.Service.traerTrabajadores().subscribe(respuesta=>{
      console.log(respuesta)
      this.Trabajadores = respuesta
    })

  
  }


  ngOnInit() {
    this.traerTrabajadores();

  }

  volverAtras() {
    this.navCtrl.back();
  }


}

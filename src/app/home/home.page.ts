import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {

  }




  ir_editar(){
    this.router.navigateByUrl("editar-p")
  }

  ngOnInit(){
    console.log("funcionaaaaa")
  }
}

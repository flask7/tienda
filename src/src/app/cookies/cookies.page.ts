import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.page.html',
  styleUrls: ['./cookies.page.scss'],
})
export class CookiesPage implements OnInit, OnDestroy {

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');

  }

  ngOnDestroy() {

    //this.comunicacion.cambiar_estado_boton('0');

  }

}

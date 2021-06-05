import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit, OnDestroy {

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');

  }

  ngOnDestroy() {

    //this.comunicacion.cambiar_estado_boton('0');

  }

}

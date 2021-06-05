import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.page.html',
  styleUrls: ['./politicas.page.scss'],
})
export class PoliticasPage implements OnInit, OnDestroy {

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');

  }

  ngOnDestroy() {

    //this.comunicacion.cambiar_estado_boton('0');

  }

}

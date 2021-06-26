import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-distribuidor',
  templateUrl: './distribuidor.page.html',
  styleUrls: ['./distribuidor.page.scss'],
})
export class DistribuidorPage implements OnInit {

  constructor(
    private comunicacion: ComunicacionService) { }

  ngOnInit() {
    this.comunicacion.cambiar_estado_boton('1');
  }

}

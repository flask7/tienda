import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.page.html',
  styleUrls: ['./info-personal.page.scss'],
})
export class InfoPersonalPage implements OnInit, OnDestroy {

  id: string = this.activate.snapshot.paramMap.get('id');
  id_pedido: string;
  estado_pedido: string;
  direccion: string;
  telefono: string;
  order_total: string;
  id_carrito: string;

  constructor(
    private alertController: AlertController,
    private activate: ActivatedRoute, 
    private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.get_info_pedido();
    this.comunicacion.cambiar_estado_boton('1');

  }

  ngOnDestroy() {

    this.comunicacion.cambiar_estado_boton('0');

  }

  async mensaje(mensaje) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Producto',
      subHeader: 'Info:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
    
  }

  get_info_pedido() {

    this.comunicacion.pedido(this.id).subscribe((data: any) => {

      //console.log(data);

      this.id_carrito = data[0].orders[0].id_cart;
      this.id_pedido = data[0].orders[0].id;
      this.estado_pedido = data[2].order_states[0].name;
      this.direccion = data[1].addresses[0].address1;
      this.telefono = data[1].addresses[0].phone;
      this.order_total = parseFloat(data[0].orders[0].total_paid_real).toFixed(2).toString();

    }, Error => {

      this.mensaje('Error al cargar la información del pedido');
      console.log(Error);

    });

  }

  repetir() {

    this.comunicacion.repetir_pedido(this.id_carrito).subscribe((data:any) => {
      
      this.mensaje(data);

    }, Error => {

      this.mensaje('Error al ejecutar el pedido');
      console.log(Error);

    })

  }

}

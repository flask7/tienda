import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.page.html',
  styleUrls: ['./historial-pedidos.page.scss'],
})
export class HistorialPedidosPage implements OnInit, OnDestroy {

  respuesta: any = [];
  vendedores: any = [];
  pedidos: any = [];
  titulo: string;
  esquema: string;

  constructor(
    private comunicacion: ComunicacionService, 
    private alertController: AlertController,
    private activate: ActivatedRoute) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');
    this.titulo = 'Mis ';
    this.esquema = 'pedidos';
    this.obtener_pedidos();

  }

  ngOnDestroy() {

    //this.comunicacion.cambiar_estado_boton('0');

  }

  async mensaje(mensaje) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      subHeader: '',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
    
  }

  obtener_pedidos() {

    const json = {

      id: localStorage.getItem('cliente_id')

    }

    this.comunicacion.pedidos(json).subscribe((data: any) => {

      for (let i = 0; i < data.orders.length; i++){

        this.pedidos.push(
            { 
              id: data.orders[i].id,
              pago: data.orders[i].payment, 
              referencia: data.orders[i].reference, 
              total: parseFloat(data.orders[i].total_paid).toFixed(2) 
            }
          );

      }

    }, Error => {

      console.log(Error);
      this.mensaje('Error al obtener los pedidos');

    });

  }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
})
export class ResenasPage implements OnInit, OnDestroy {

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

    this.titulo = 'Mis ';
    this.esquema = 'opiniones';
    this.comunicacion.cambiar_estado_boton('1');
    this.get_mensajes();

  }

  ngOnDestroy() {

    this.comunicacion.cambiar_estado_boton('0');

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

  get_mensajes(){

    const json = {
      id: localStorage.getItem('cliente_id')
    }

    this.comunicacion.obtener_mensajes_usuario(json).subscribe((data: any) => {

      if (data == 'Aún no tienes comentarios') {

        this.respuesta = data;

      }else{

        for (let i = 0; i < data.mensaje.length; i++) {

          this.vendedores.push({mensaje: data.mensaje[i], vendedor: data.vendedor[i]});

        }

      }

    }, Error => {

      this.mensaje('Error al obtener los mensajes');
      console.log(Error);

    });

  }

}

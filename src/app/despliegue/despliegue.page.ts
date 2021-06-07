import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-despliegue',
  templateUrl: './despliegue.page.html',
  styleUrls: ['./despliegue.page.scss'],
})
export class DesplieguePage implements OnInit, OnDestroy {

	productos: any = [];
	id: string;
  loading: any;

  constructor(
    private sanitizer: DomSanitizer, 
    private activate: ActivatedRoute, 
    private comunicacion: ComunicacionService,
    private cargando: LoadingController) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');

  	let parametro = this.activate.snapshot.paramMap.get('id'),
      json = { id: parametro };

    this.id = parametro;

	  this.obtener_productos(parametro);

  }

  ngOnDestroy() {

    //this.comunicacion.cambiar_estado_boton('0');
    this.loading.dismiss();

  }

  async presentLoading() {

    this.loading = await this.cargando.create({
      cssClass: 'my-custom-class',
      message: 'Cargando productos'
    });

    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

  }

  async obtener_productos(id: string) {

    this.presentLoading();

  	await this.comunicacion.sub_productos(this.id).subscribe(async (data: any) => {

  		this.productos = data;

  		for (let i = 0; i < this.productos.imagen.base64.length; i++) {

        let conversion = parseFloat(this.productos.precio[i]),
          monto = conversion.toFixed(2);
  			
  			this.productos.precio[i] = monto;

		  }

      let json = {

        imagenes: this.productos.imagen.base64

      }

      this.loading.dismiss();

      await this.comunicacion.obtener_imagenes(json).subscribe((data2: any) => {

        for (let i = 0; i < data2.length; i++) {

          if (this.productos.imagen.base64[i] != 'paso') {

            let imagen = this.sanitizer.bypassSecurityTrustStyle(`url(data:image/jpeg;base64,${ data2[i] })`);

            this.productos.imagen.base64[i] = imagen;

          } else {

            this.productos.imagen.base64[i] = this.sanitizer.bypassSecurityTrustStyle("url('../assets/nd.svg.png')");

          }

        }

      }, Error => {

        console.log(Error);

      });

  	}, Error => {

      this.loading.dismiss();
  		console.log(Error);

  	});

  }

}

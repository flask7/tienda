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
  pagina: number = 0;
  limite:number = 1;
  multiplicador: number = 0;
  paginator: string;

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

    this.productos = [];
    this.pagina = 0;
    this.limite = 1;
    this.multiplicador = 0;

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

  paginar(valor) {

    if (this.pagina === (this.limite - 1) && valor === -1) {

      return false;

    }

    if (this.pagina === 0 && valor === 1) {

      return false;

    }

    this.pagina = this.pagina - valor;
    this.productos = [];
    this.multiplicador = 0;
    this.multiplicador =  this.pagina * 30;

    this.obtener_productos(this.id);

  }

  async obtener_productos(id: string) {

    this.presentLoading();

  	await this.comunicacion.sub_productos({ categoria: this.id, pagina: this.multiplicador }).subscribe(async (data: any) => {

      this.limite = Math.round(parseFloat(data.paginas));
  		this.productos = data;
      this.paginator = 'Página ' + (this.pagina + 1) + ' de ' + this.limite;

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

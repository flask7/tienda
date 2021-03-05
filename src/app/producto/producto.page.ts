import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  id: string;
  nombre: string;
	cantidad: number = 0;
  existencia: number;
	ocultar: boolean = false;
	imagen: any;
  precio: string;
  descripcion: string;
  referencia: string;
	_productos: any = [];
  categoria: string;
  activo: number = 0;

  constructor(private alertController: AlertController, private sanitizer: DomSanitizer, private comunicacion: ComunicacionService, private activate: ActivatedRoute) { }

  ngOnInit() {

    this.categoria = this.activate.snapshot.paramMap.get('categoria');
    let parametro = this.activate.snapshot.paramMap.get('id');
    this.id = parametro;
    let json = {id: parametro, categoria: this.categoria};

  	this.comunicacion.productos_info(json).subscribe((data: any) => {

  		let conversion = parseFloat(data[0].products[0].price);
      let monto = conversion.toFixed(2);
      let info = 'data:image/jpeg;base64, ' + data[1].toString();
      
      this.precio = monto.toString();
      this.descripcion = data[0].products[0].description;
      this.nombre = data[0].products[0].name;
      this.referencia = data[0].products[0].reference;
      this.existencia = parseInt(data[0].products[0].quantity);
      this.imagen = this.sanitizer.bypassSecurityTrustUrl(info);

  	}, Error => {

  		console.log(Error);

  	});

    this.comunicacion.relacionados(json).subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {

        let conversion = parseFloat(data[i].precio);
        let monto = conversion.toFixed(2);
        let info = 'data:image/jpeg;base64, ' + data[i].imagen.toString();

        data[i].precio = monto.toString();
        data[i].imagen = this.sanitizer.bypassSecurityTrustUrl(info);

      }

      this._productos = data;
      this.activo = 1;

    }, Error => {

      console.log(Error);

    });


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

  revision(){

  	let ocultar = document.getElementById('ocultar')
  	let mostrar = document.getElementById('desplegar')

  	if (this.ocultar) {

  		ocultar.style.display = 'block'
  		mostrar.style.display = 'none'

  	}else{

  		ocultar.style.display = 'none'
  		mostrar.style.display = 'block'

  	}

  }

  add(id = this.id, precio = this.precio, nombre = this.nombre, cantidad = this.cantidad){

    let resultado = this.comunicacion.add_producto(id, precio, nombre, cantidad);

    this.mensaje(resultado);

  }

}

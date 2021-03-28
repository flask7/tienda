import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';

import { TutorialPage } from '../tutorial/tutorial.page';

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
  ocultar_comentarios: boolean = false;
	imagen: any;
  precio: string;
  descripcion: string;
  referencia: string;
	_productos: any = [];
  categoria: string;
  activo: number = 0;
  sesion: string = localStorage.getItem('sesion');
  direccion: string;
  clientes: any = [];
  respuesta: string;
  limite: number = 2;

  constructor(
    public modalController: ModalController,
    private alertController: AlertController, 
    private sanitizer: DomSanitizer, 
    private comunicacion: ComunicacionService, 
    private activate: ActivatedRoute) { }

  ngOnInit() {

    this.categoria = this.activate.snapshot.paramMap.get('categoria');
    let parametro = this.activate.snapshot.paramMap.get('id');
    this.id = parametro;
    let json = {id: parametro, categoria: this.categoria};

    
    if (this.sesion == 'activa') {

      this.obtener_direcciones();

    }else{

      let contador = parseInt(localStorage.getItem('contador'));

      if (!contador || contador < 1) {
       
        this.presentModal();
        
      }

    }

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

    }, Error => {

      console.log(Error);

    });

    this.get_mensajes();

  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: TutorialPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();

  }

  validar_boton(cantidad){

    this.cantidad = this.cantidad - (cantidad);

    if (this.existencia > this.cantidad && this.cantidad > 0 && this.sesion == 'activa') {

      this.activo = 1;

    }else{

      this.activo = 0;

    }

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

  obtener_direcciones(){

    const cliente_id = localStorage.getItem('cliente_id');
    let direcciones = [];

    this.comunicacion.obtener_direcciones(cliente_id).subscribe((data:any) => {

      this.direccion = data.addresses[0].id;

    }, Error => {

      console.log(Error.message);

    });

  }

  revision(){

  	let ocultar = document.getElementById('ocultar');
  	let mostrar = document.getElementById('desplegar');

  	if (this.ocultar) {

  		ocultar.style.display = 'block';
  		mostrar.style.display = 'none';

  	}else{

  		ocultar.style.display = 'none';
  		mostrar.style.display = 'block';

  	}

  }

  revision_comentarios(){

    let ocultar = document.getElementById('hide');
    let mostrar = document.getElementById('deploy');

    if (this.ocultar_comentarios) {

      ocultar.style.display = 'block';
      mostrar.style.display = 'none';
      this.limite = this.clientes.length;

    }else{

      ocultar.style.display = 'none';
      mostrar.style.display = 'block';
      this.limite = 2;

    }

  }

  add(id_customer = localStorage.getItem('cliente_id'), id = this.id, precio = this.precio, nombre = this.nombre, cantidad = this.cantidad){

    this.comunicacion.obtener_productos(id_customer).subscribe((data: any) => {

      if (data.length > 0) {
     
        if (data[0].carts.length > 0) {
        
          let datos = data[0].carts;

          for (let i = 0; i < datos.length; i++) {

            if (datos[i].associations.cart_rows[0].id_product === id) {

              return this.mensaje('Ya ha seleccionado este producto');

            }

          }

        }

        this.add_carrito(id_customer, id, precio, nombre, cantidad, this.direccion);

      }else{

        this.add_carrito(id_customer, id, precio, nombre, cantidad, this.direccion);

      }


    }, Error => {

      console.log(Error.message);

      this.mensaje(Error.message);

    });

  }

  add_carrito(id_customer, id, precio, nombre, cantidad, direccion){

    this.comunicacion.add_producto(id_customer, id, precio, nombre, cantidad, direccion).subscribe((data: any) => {

      this.mensaje(data[0]);

    }, Error => {

      this.mensaje('Error al añadir el producto');
      console.log(Error);

    });

  }

  get_mensajes(){

    const json = {
      id: this.id
    }

    this.comunicacion.obtener_mensajes(json).subscribe((data: any) => {

      if (data == 'Este producto no tiene comentarios') {

        this.respuesta = data;

      }else{

        for (let i = 0; i < data.mensaje.length; i++) {
       
          this.clientes.push({mensaje: data.mensaje[i], cliente: data.cliente[i]});

        }

      }

    }, Error => {

      this.mensaje('Error al obtener los mensajes');
      console.log(Error);

    });

  }

}

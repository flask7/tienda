import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertController, ModalController, LoadingController, IonSlides } from '@ionic/angular';

import { TutorialPage } from '../tutorial/tutorial.page';

import { Observable } from 'rxjs/Rx';
import { isDeepStrictEqual } from 'util';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
  providers: [IonSlides]
})

export class ProductoPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  ruta_anterior: Observable<string>;
  id: string;
  nombre: string;
	cantidad: number = 0;
  existencia: number;
	ocultar: boolean = false;
  ocultar_comentarios: boolean = false;
	imagen: any = [];
  precio: string;
  precio_base: number;
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
  pago: string = '';
  opciones: any = [];
  variantes: any = [];
  valores_select: any = [];
  opcion_seleccionada: any = [];
  loading: any = [];
  descuento: number = 0.00;
  boton: any;

  constructor(
    private cargando: LoadingController, 
    public modalController: ModalController,
    private alertController: AlertController, 
    private sanitizer: DomSanitizer, 
    private comunicacion: ComunicacionService, 
    private activate: ActivatedRoute) { }

  async ngOnInit() {

    this.categoria = this.activate.snapshot.paramMap.get('categoria');
    let parametro = this.activate.snapshot.paramMap.get('id');
    this.id = parametro;
    let json = { id: parametro, categoria: this.categoria };

    this.comunicacion.cambiar_estado_boton('1');
    
    if (this.sesion == 'activa') {

      await this.obtener_direcciones();

    } else {

      let contador = parseInt(localStorage.getItem('contador'));

      if (!contador || contador < 1) {
       
        await this.presentModal();

      } 

    }

    this.presentLoading();
  	this.comunicacion.productos_info(json).subscribe((data: any) => {

      this.precio_base = parseFloat(data[0].products[0].price);
      this.precio = parseFloat(data[0].products[0].price).toFixed(2).toString();
      this.descripcion = data[0].products[0].description;
      this.nombre = data[0].products[0].name;
      this.referencia = data[0].products[0].reference;
      this.existencia = parseInt(data[0].products[0].quantity);

      if (data[1] != undefined) {

        for (let i = 0; i < data[1].length; i++) {

          this.imagen.push(data[1][i]);

          if (i == 0) {

            this.lazy_imagenes(this.imagen[i], i);

          }
          
        }

      } else {

        this.imagen.push("../assets/nd.svg.png");

      }

      this.loading.dismiss();

      let datos = data[2],
        datos2 = data[3];

      if(datos) {

        let ids = [],
          nombres = [];

        if (datos != undefined && datos2.length > 0 && datos2 != undefined) {

          for (let i = 0; i < datos2[0].product_options.length; i++){
            
            ids.push(datos2[0].product_options[i].id);
            nombres.push(datos2[0].product_options[i].name);

          }

          for (let i = 0; i < datos[0].product_option_values.length; i++){

            let opcion = datos[0].product_option_values[i];

            this.opciones.push(opcion); 
    
          }

        }

        const ids_unicos = ids.filter((valor, indice) => {

            return ids.indexOf(valor) === indice;

          }

        );

        const nombres_unicos = nombres.filter((valor, indice) => {

            return nombres.indexOf(valor) === indice;

          }
        
        );
      
        for (let i = 0; i < nombres_unicos.length; i++) {
          
          this.variantes.push({

            id: ids_unicos[i],
            nombre: nombres_unicos[i]
  
          });
          
        }

      }

      if (this.existencia > 0) {

        this.validar_boton(-1);

      }

  	}, Error => {

  		console.log(Error);
      this.loading.dismiss();

  	});

    this.comunicacion.relacionados(json).subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {

        let conversion = parseFloat(data[i].precio),
          monto = conversion.toFixed(2),
          info = 'data:image/jpeg;base64, ' + data[i].imagen.toString();

        data[i].precio = monto.toString();
        data[i].imagen = this.sanitizer.bypassSecurityTrustUrl(info);

      }

      this._productos = data;

    }, Error => {

      console.log(Error);
      this.loading.dismiss();

    });

    this.get_mensajes();

  }

  ngOnDestroy() {

   // this.comunicacion.cambiar_estado_boton('0');
    this.loading.dismiss();

  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: TutorialPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();

  }

  validar_boton(cantidad) {

    this.cantidad = this.cantidad - (cantidad);
    this.precio = (this.precio_base * this.cantidad).toFixed(2).toString();
    
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

      if (data.addresses) {

        this.direccion = data.addresses[0].id;
        
      }

    }, Error => {

      console.log(Error.message);

    });

  }

  revision(){

  	let ocultar = document.getElementById('ocultar'),
  	  mostrar = document.getElementById('desplegar');

  	if (this.ocultar) {

  		ocultar.style.display = 'block';
  		mostrar.style.display = 'none';

  	}else{

  		ocultar.style.display = 'none';
  		mostrar.style.display = 'block';

  	}

  }

  revision_comentarios(){

    let ocultar = document.getElementById('hide'),
      mostrar = document.getElementById('deploy');

    if (this.ocultar_comentarios) {

      ocultar.style.display = 'block';
      mostrar.style.display = 'none';
      this.limite = this.clientes.length;

    } else {

      ocultar.style.display = 'none';
      mostrar.style.display = 'block';
      this.limite = 2;

    }

  }

  add(
    id_customer = localStorage.getItem('cliente_id'), 
    id = this.id, 
    precio = this.precio, 
    nombre = this.nombre, 
    cantidad = this.cantidad, pago = this.pago) {

    this.boton = document.querySelector('.bcarrito');

    this.boton.setAttribute('disabled', '');
    this.comunicacion.obtener_productos(id_customer).subscribe((data: any) => {

      /*this.boton.removeAttribute('disabled');
      return this.mensaje(console.log(data));*/

      if (data.length > 0) {

        if (data[1].length > 0) {

          for (let i = 0; i < data[1].products.length; i++) {

            console.log(data[1].products.length);

            if (data[1].products[i].id == id) {

              return this.mensaje('El producto ya ha sido añadido, modfícalo en el carrito');

            }
            
          }

        }

      }

      let productos = data;

      productos.push({

        id_customer,
        id,
        nombre,
        precio,
        quantity: cantidad

      });

      this.add_carrito(
        id_customer, 
        id, 
        precio, 
        nombre, 
        cantidad, 
        this.direccion, 
        this.valores_select);

    }, Error => {

      console.log(Error.message);
      this.boton.removeAttribute('disabled');
      this.mensaje(Error.message);

    });

  }

  async presentLoading() {

    this.loading = await this.cargando.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...'
    });

    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

  }

  add_carrito(id_customer, id, precio, nombre, cantidad, direccion, opciones) {

    this.comunicacion.add_producto(id_customer, id, precio, nombre, cantidad, direccion, opciones).subscribe((data: any) => {

      this.mensaje(data[0]);
      this.boton.removeAttribute('disabled');

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
       
          this.clientes.push({ mensaje: data.mensaje[i], cliente: data.cliente[i] });

        }

      }

    }, Error => {

      this.loading.dismiss();
      this.mensaje('Error al obtener los mensajes');
      console.log(Error);

    });

  }

  obtener_indice() {

    this.slides.getActiveIndex().then((index: number) => {

      let slide = document.querySelector(".imgp" + index.toString());

      if (slide.children.length == 0) {

        this.lazy_imagenes(this.imagen[index], index);

      }

    });

  }

  lazy_imagenes(id, i) {   

    this.comunicacion.obtener_imagenes({ imagenes: [id], size: 1 }).subscribe((data: any) => {     

      if (data != 'paso') {

        for (let i = 0; i < this.imagen.length; i++) {

          if (id == this.imagen[i].toString()) {

            let info = 'data:image/jpeg;base64, ' + data,
              imagen_limpia = this.sanitizer.bypassSecurityTrustUrl(info);

            let slide = document.querySelector(".imgp" + i.toString()),
              img = document.createElement('img');

            img.setAttribute('src', info);
            img.setAttribute('class', 'productox');
            slide.appendChild(img);
            break;

          }
          
        }

      } else {

        this.imagen.push("../assets/nd.svg.png");

      }

    }, Error => {

      console.log(Error);

    });

  }

  obtener_valor_select(valor) {

    if (this.valores_select.length == 0) {

      this.valores_select.push(valor);

    } else {

      let contador = 0;

      for (let obj in this.valores_select) {
  
        if (this.valores_select[obj] === valor.select) {
  
          break;
  
        } else {
        
          if (contador == (this.valores_select.length - 1) && this.valores_select.length > 1) {

            this.valores_select.push(valor);

          }
  
        }
  
      }

    }

  }

}

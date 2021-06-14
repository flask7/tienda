import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Observable } from 'rxjs/Rx';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

	info: any = [];
	nombres: any = [];
  productos: Observable<Array<string>>;
  loading: any;
  id_carrito: string;
  usuario: Observable<string>;
  mostrar_boton: number = -1;
  cantidad_mod: any = [];
  valor_mod: any = [];
  opcion_seleccionada: any = [];
  asociaciones: any = [];
  valores_select: any = [];
  opciones: any = [];

  constructor(
    private comunicacion: ComunicacionService,
    private cargando: LoadingController, 
    private alerta: AlertController) { }

  ngOnInit(){

    this.comunicacion.estado_usuario().subscribe((data) => {

      this.usuario = Observable.of(data);

    }, Error => console.log(Error));

    if (localStorage.getItem('cliente_id')) {
     
      this.get_products();
      
    }

  }

  async presentLoading() {

    this.loading = await this.cargando.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...'
    });

    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

  }

  async mensaje(mensaje) {

    const alert = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Producto',
      subHeader: 'Info:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
    
  }

  get_products(){

    //this.presentLoading();
    this.comunicacion.obtener_productos(localStorage.getItem('cliente_id')).subscribe((data: any) => {

      console.log(data);

      try {

        const index = data[0].carts.length - 1;

        console.log(data[0].carts[index]);

        this.id_carrito = data[0].carts[index].id.toString();

        let coincidencias = 0;

        for (let i = 0; i < data[1].products.length; i++) {
          
          for (let x = 0; x < data[0].carts[index].associations.cart_rows.length; x++) {

            if (data[1].products[i].id == data[0].carts[index].associations.cart_rows[x].id_product) {
                      
              coincidencias++;

              if (x == (data[0].carts[index].associations.cart_rows.length - 1) && i == (data[1].products.length - 1)) {
                
                for (let a = 0; a < coincidencias; a++) {
                
                  this.info.push({

                   "id_carrito": data[0].carts[index].id, 
                   "id": data[0].carts[index].associations.cart_rows[x - a].id_product,
                   "precio": data[0].carts[index].order_total, 
                   "nombre": data[1].products[i].name,
                   "cantidad": data[0].carts[index].associations.cart_rows[x - a].quantity

                  });
                  this.cantidad_mod.push(data[0].carts[index].associations.cart_rows[x - a].quantity);

                }

              }

            } else {

              for (let a = 0; a < coincidencias; a++) {
                
                this.info.push({

                 "id_carrito": data[0].carts[index].id,
                 "id": data[0].carts[index].associations.cart_rows[x - a].id_product,
                 "precio": data[0].carts[index].order_total, 
                 "nombre": data[1].products[i].name,
                 "cantidad": data[0].carts[index].associations.cart_rows[x - a].quantity

               });
                this.cantidad_mod.push(data[0].carts[index].associations.cart_rows[x - a].quantity);

              }

              coincidencias = 0;

            }

          }

          for (let i = 0; i < this.info.length; i++) {

            this.opciones[i] = [];

            for (let x = 0; x < data[2].product_options.length; x++) {

              this.opciones[i].push(data[2].product_options[x].name);

            }

          }

        }

      } catch (e) {

        this.info = [];

      }   

      this.productos = Observable.of(this.info);

      this.comunicacion.actualizar_productos(this.info);
      //this.loading.dismiss();

    }, Error => {

      console.log(Error.message);

      //this.loading.dismiss();
      this.mensaje('Error al cargar los productos');

    });

  }

  cantidad_modificada(i, valor) {

    if (this.cantidad_mod[i] <= 1 && valor == 1) {

      return false;

    }

    this.cantidad_mod[i] = this.cantidad_mod[i] - valor;

  }

  modificar_producto(i) {

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

  eliminar_producto(id) {

    this.comunicacion.eliminar_producto(id).subscribe((data: any) => {

      this.mensaje(data);

      this.info = [];

      this.get_products();

    }, Error => {

      this.mensaje(Error.message);
      console.log(Error);

    });

  }

}

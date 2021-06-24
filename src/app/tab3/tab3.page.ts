import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Observable } from 'rxjs/Rx';
import { AlertController, LoadingController } from '@ionic/angular';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {

	info: any = [];
	nombres: any = [];
  productos: Observable<Array<string>>;
  loading: any = true;
  id_carrito: string;
  usuario: Observable<string>;
  mostrar_boton: number = -1;
  cantidad_mod: any = [];
  valor_mod: any = [];
  opcion_seleccionada: any = [];
  asociaciones: any = [];
  valores_select: any = [];
  opciones: any = [];
  total_producto: any = [];

  constructor(
    private comunicacion: ComunicacionService,
    private cargando: LoadingController, 
    private alerta: AlertController,
    public events: EventsService) { }

  ngOnInit() {

    this.events.destroy('CargarCarrito');
    this.events.subscribe('CargarCarrito', () => {

      this.info = [];
      this.verificar_productos();
      this.loading = false;

    });

    this.verificar_productos();
    // this.loading = false;

  }

  verificar_productos() {

    this.comunicacion.estado_usuario().subscribe((data) => {

      this.usuario = Observable.of(data);

      if (localStorage.getItem('cliente_id')) {
     
        this.get_products();
        
      }

    }, Error => console.log(Error));

  }

  // async presentLoading() {

  //   this.loading = await this.cargando.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Cargando...'
  //   });

  //   await this.loading.present();

  //   const { role, data } = await this.loading.onDidDismiss();

  // }

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

  get_products() {

    this.info = [];
    this.mostrar_boton = -1;
    this.productos = Observable.of(this.info);

    this.comunicacion.obtener_productos(localStorage.getItem('cliente_id')).subscribe((data: any) => {

      this.loading = false;

       if (data.length > 0) {

        if (data[0].carts) {

          if (data[0].carts.length > 0) {

            let carts = data[0].carts,
              products = data[1].products,
              index = carts.length - 1;

            this.id_carrito = carts[index].id.toString();

            for (let i of carts[index].associations.cart_rows) {

              if (i.id_product != '0') {

                this.info.push({

                  id_carrito: data[0].carts[index].id,
                  id: i.id_product,
                  precio: parseFloat(products.find(x => x.id == i.id_product).price).toFixed(2).toString(),
                  nombre: products.find(x=>x.id == i.id_product).name,
                  cantidad: i.quantity

                });

                let total = (parseFloat(products.find(x => x.id == i.id_product).price) * parseFloat(i.quantity)).toFixed(2).toString();

                this.total_producto.push(total);
                this.cantidad_mod.push(i.quantity);

              }

            }

          } else {

            this.info = [];

          }

        } else {

          this.info = [];

        }

      } else {

        this.info = [];

      }

      this.productos = Observable.of(this.info);

      this.comunicacion.actualizar_productos(this.info);

     /* return false;

      if (data.length > 0) {

        if (data[0].carts) {

          if (data[0].carts.length > 0) {

            const index = data[0].carts.length - 1;

            this.id_carrito = data[0].carts[index].id.toString();

            let coincidencias = 0;

            if (data[1].products) {

              if (data[1].products.length > 0) {
                
                for (let i = 0; i < data[1].products.length; i++) {

                   if (data[1].products[i].associations) {

                    this.opciones[i] = {
                      valores: [],
                      atributo: [],
                      grupo: [],
                      cantidad: [],
                      nombres: [],
                      precio: [],
                      id: []
                    };

                    this.opciones[i].id.push(data[1].products[i].id);
                    this.opciones[i].precio.push(data[1].products[i].price);
                    this.opciones[i].nombres.push(data[1].products[i].name);

                    if (data[1].products[i].associations.product_option_values) {

                      if (data[1].products[i].associations.product_option_values.length > 0) {

                        for (let x = 0; x < data[1].products[i].associations.product_option_values.length; x++) {

                          for (let y = 0; y < data[3].product_option_values.length; y++) {

                            if (data[3].product_option_values[y].id == data[1].products[i].associations.product_option_values[x].id) {

                              for (let a = 0; a < data[2].product_options.length; a++) {

                                if (data[3].product_option_values[y].id_attribute_group == data[2].product_options[a].id) {

                                  this.opciones[i].valores.push({ 
                                    id: data[3].product_option_values[y].id,
                                    nombre: data[3].product_option_values[y].name,
                                    grupo: data[2].product_options[a].id });

                                  this.opciones[i].atributo.push(data[2].product_options[a].name);
                                  this.opciones[i].grupo.push(data[2].product_options[a].id);
                                                                
                                }

                              }

                            }

                          }

                        }

                      }

                    }

                  }

                  for (let x = 0; x < data[0].carts[index].associations.cart_rows.length; x++) {

                    if (data[1].products[i].id == data[0].carts[index].associations.cart_rows[x].id_product) {
                              
                      coincidencias++;

                      if (x == (data[0].carts[index].associations.cart_rows.length - 1) && i == (data[1].products.length - 1)) {
                        
                        for (let a = 0; a < coincidencias; a++) {
                        
                          this.info.push({

                           "id_carrito": data[0].carts[index].id, 
                           "id": data[0].carts[index].associations.cart_rows[x - a].id_product,
                           "precio": parseFloat(data[1].products[i].price).toFixed(2).toString(),
                           "nombre": data[1].products[i].name,
                           "cantidad": data[0].carts[index].associations.cart_rows[x - a].quantity

                          });

                          this.cantidad_mod.push(data[0].carts[index].associations.cart_rows[x - a].quantity);
                          this.opciones[i].cantidad.push(data[0].carts[index].associations.cart_rows[x - a].quantity);

                        }

                      }

                    } else {

                      for (let a = 0; a < coincidencias; a++) {
                        
                        this.info.push({

                         "id_carrito": data[0].carts[index].id,
                         "id": data[0].carts[index].associations.cart_rows[x - a].id_product,
                         "precio": parseFloat(data[1].products[i].price).toFixed(2).toString(),
                         "nombre": data[1].products[i].name,
                         "cantidad": data[0].carts[index].associations.cart_rows[x - a].quantity

                       });

                        this.cantidad_mod.push(data[0].carts[index].associations.cart_rows[x - a].quantity);
                        this.opciones[i].cantidad.push(data[0].carts[index].associations.cart_rows[x - a].quantity);

                      }

                      coincidencias = 0;

                    }

                  }

                  this.opciones[i].atributo = this.opciones[i].atributo.filter((valor, indice) => {

                    return this.opciones[i].atributo.indexOf(valor) === indice;

                  });

                  this.opciones[i].grupo = this.opciones[i].grupo.filter((valor, indice) => {

                    return this.opciones[i].grupo.indexOf(valor) === indice;

                  });

                }
                
              }

            }

          } else {

            this.info = [];

          }

        }

          
      } else {

        this.info = [];

      }

      this.productos = Observable.of(this.info);

      this.comunicacion.actualizar_productos(this.info);*/

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

    const json = {

      id_customer: localStorage.getItem('cliente_id'),
      id: this.info[i].id,
      nombre: this.info[i].nombre,
      precio: ((parseFloat(this.info[i].precio) * parseInt(this.cantidad_mod[i])).toFixed(2)).toString(),
      quantity: this.cantidad_mod[i],
      //opciones: this.valores_select,
      indice: i

    };

    this.total_producto[i] = json.precio;
    this.valores_select = [];

    this.comunicacion.modificar_producto(json).subscribe((data:any) => {

      this.mensaje(data[0]);

      for (let i in this.info) {
        this.info[i].cantidad = this.cantidad_mod[i]
      }

    }, Error => {

      this.mensaje('Ha ocurrido un error al modificar el producto');
      console.log(Error);

    });

  }

  abrir_producto(valor) {

    this.valores_select = [];
    this.opcion_seleccionada = [];
    this.mostrar_boton = valor; 

  }

  obtener_valor_select(i, valor) {

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
      this.events.publish('obtenerProductos');

    }, Error => {

      this.mensaje(Error.message);
      console.log(Error);

    });

  }

}

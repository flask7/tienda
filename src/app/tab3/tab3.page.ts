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

  constructor(
    private comunicacion: ComunicacionService,
    private cargando: LoadingController, 
    private alerta: AlertController) {}

  ngOnInit(){

    this.get_products();

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

    this.presentLoading();

    this.comunicacion.obtener_productos(localStorage.getItem('cliente_id')).subscribe((data: any) => {

      if (data.length > 0) {

        if (data[0].carts.length > 0) {
          
          for (let i = 0; i < data[0].carts.length; i++) {
         
           for (let x = 0; x < data[1].products.length; x++) {
             
             if (data[1].products[x].id == data[0].carts[i].associations.cart_rows[0].id_product) {
              
               this.info.push({
                  "id_carrito": data[0].carts[i].id, 
                  "id": data[0].carts[i].associations.cart_rows[0].id_product,
                  "precio": data[0].carts[i].order_total, 
                  "nombre": data[1].products[x].name,
                  "cantidad": data[0].carts[i].associations.cart_rows[0].quantity});

             }

           }

          }

          this.loading.dismiss();

        }else{

          this.info = [];

          this.loading.dismiss();

        }

      }else{

        this.info = [];

        this.loading.dismiss();

      }


    }, Error => {

      console.log(Error.message);

      this.loading.dismiss();
      this.mensaje('Error al cargar los productos');

    });

    this.productos = Observable.of(this.info);

    this.comunicacion.actualizar_productos(this.info);

  }

  eliminar_producto(id){

    this.comunicacion.eliminar_producto(id).subscribe((data: any) => {

      this.mensaje(data);

      this.info = [];

      this.get_products();

    }, Error => {

      this.mensaje(Error.message);

    });

  }

}

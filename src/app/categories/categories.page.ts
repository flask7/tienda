import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacionService } from '../comunicacion.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

	productos: any = [{categoria: [], nombre: [], precio: [], imagen: []}];
  nombre: string;
  categorias: any;
  imagenes: any;

  constructor(private activate: ActivatedRoute, private alerta: AlertController, private comunicacion: ComunicacionService, private cargando: LoadingController) { }

   ngOnInit(){

     this.datos();

   }

  async error(mensaje) {

    const alert = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Detalle:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async datos() {

    let parametro = this.activate.snapshot.paramMap.get('id');
    let datos = this.comunicacion.items;

    for (let i =  0; i < datos.length; i++) {

      if (datos[i].id == parametro) {

        this.nombre = datos[i].nombre;
        break;

      }

    }

    const json = {
      "id": parametro
    }

    let sub_categorias;
    let productos;
    let resultado = [];
    let resultado2 = [];

    console.log(parametro);

    if (parametro === '203') {

          this.categorias = [{
              "id": 615,
              "name": "Masaje y Relajación",
              "products": [
                {
                  "id": 21992,
                  "price": "19.83",
                  "name": "Soporte antifatiga con imanes"
                },
                {
                  "id": 33224,
                  "price": "5.46",
                  "name": "Saco térmico de huesos de cereza"
                },
                {
                  "id": 88690,
                  "price": "1.62",
                  "name": "Parches de calor megaplast 13 cm x 10 cm"
                }
            ]
          },
          {
              "id": 616,
              "name": "Belleza",
              "products": [
                {
                  "id": 12345,
                  "price": "4.95",
                  "name": "Alzas para zapatos goma eva"
                },
                {
                  "id": 20531,
                  "price": "26.44",
                  "name": "Bronceador solac bronze air perfection"
                },
                {
                  "id": 20789,
                  "price": "18.18",
                  "name": "Báscula de bolsillo"
            }]
          },
          /*{
              "id": 1406,
              "name": "Bebé",
              "products": []
          }*/]

    }else if(parametro == '29'){
        this.categorias = [{
                 "id": 33,
                 "name": "Vales de regalo",
                 "products": []
             },
             {
                 "id": 37,
                 "name": "Liquidación",
                 "products": []
             },
             {
                 "id": 128,
                 "name": "Equipaciones",
                 "products": [
                    {
                        "id": 574,
                        "price": "10.72",
                        "name": "Equipación deportiva riscko eqr-003"
                    },
                    {
                        "id": 576,
                        "price": "10.72",
                        "name": "Equipación deportiva riscko eqr-010"
                    },
                    {
                        "id": 578,
                        "price": "26.85",
                        "name": "Equipación portero riscko eqr-005"
                    }]
            }]

           /*this.comunicacion.imagenes('578').subscribe((data:any) => {
             
             this.imagenes = data;

             console.log(data);

           }, Error => {
             console.log(Error)
           });*/

           
           /*((data:any) => {
          
              console.log(data);

            }, Error => { console.log(Error) });*/

    }

    console.log(this.categorias);

    /* this.cargando.create().then(async l => {

      l.present();

     await this.comunicacion.productos(json).subscribe((data: any) => {

      sub_categorias = data.categories[0].associations.categories;
      productos = data.categories[0].associations.products;

      for (let i = 0; i < sub_categorias.length; i++) {

        resultado.push(sub_categorias[i].id);

      }

      for (let i = 0; i < productos.length; i++) {

        resultado2.push(productos[i].id);

      }

      let json2 = {

        "sub_categorias": resultado,
        "limite": 3

      }

      this.comunicacion.productos_data(json2).subscribe((data2: any) => {

        console.log(data2);

        this.categorias = data2[0][2];
        let categorias = JSON.parse(data2[0][1]);
        let contador;

        for (var x = 0; x < this.categorias.length; x++) {

          for (let i = 0; i < data2[0][0].length; i++) {

            let info = data2[0][0][i].products[0];

            if (categorias.id[x] == info.id_category_default) {

              contador++;

              let conversion = parseFloat(info.price);
              let monto = conversion.toFixed(2);
              this.productos[0].categoria.push(categorias.nombre[x]);
              this.productos[0].nombre.push(info.name);
              this.productos[0].precio.push(monto.toString());
              this.productos[0].imagen.push(data2[0][3]);

            }

          }

        }

        console.log(this.categorias, this.productos[0].categoria);

        l.dismiss();

     }, Error => {

        console.log(Error.message);

        l.dismiss();
        this.error('Error al obtener los datos: ' + Error.message);

      });

    }, Error => {

      console.log(Error.message);

      l.dismiss();
      this.error('Error al obtener los datos: ' + Error.message);

    });

      l.dismiss();

    }, Error => { 

      this.error('Error al obtener los datos: ' + Error.message);

    }); */

  }

}

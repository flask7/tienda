import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacionService } from '../comunicacion.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  resultado: any = [];
	categorias_llenas: any = [{
    id: [], categoria: []
  }];
  productos: any = [];
  nombre: string;
  categorias: any = [{
    id: [],
    name: [],
    products: []
  }];
  imagenes: any = [];
  id: string;

  constructor(private sanitizer: DomSanitizer, private activate: ActivatedRoute, private alerta: AlertController, private comunicacion: ComunicacionService, private cargando: LoadingController) { }

   ngOnInit(){

     this.datos();

     for (let i = 0; i < this.comunicacion.items.length; i++) {

       if (this.id == this.comunicacion.items[i].id) {

         this.nombre = this.comunicacion.items[i].nombre;

       }

     }

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

    const json = {
      categoria: parametro
    }

    this.id = parametro;

    this.comunicacion.productos_data(json).subscribe((data: any) => {

      for (let x = 0; x < data[0].sub_categorias.nombre.length; x++) {

        this.categorias[0].name.push(data[0].sub_categorias.nombre[x]);
        this.categorias[0].id.push(data[0].sub_categorias.id[x]);

        for (let y = 0; y < data[0].sub_categorias.productos.length; y++) {
          
          for (let i = 0; i < data[0].sub_categorias.productos[y].length; i++) {              

            if (data[0].sub_categorias.productos[y][i].id_category_default == this.categorias[0].id[x].toString()) {
          
              this.categorias[0].products.push(data[0].sub_categorias.productos[y][i]);
              this.categorias_llenas[0].id.push(data[0].sub_categorias.id[x]);
              this.categorias_llenas[0].categoria.push(data[0].sub_categorias.nombre[x]);

            }

          }

        }

      }

      this.categorias[0].name = [...new Set(this.categorias_llenas[0].categoria)];
      this.categorias[0].id = [...new Set(this.categorias_llenas[0].id)];

      for (let i = 0; i < this.categorias[0].products.length; i++) {

        let conversion = parseFloat(this.categorias[0].products[i].price);
        let monto = conversion.toFixed(2);

        this.categorias[0].products[i].price = monto;

      }

      this.obtener_imagenes(this.categorias[0].products);

    }, Error => {

      console.log(Error);

    });

  }

  obtener_imagenes(productos) {

    let json = {

      imagenes: []

    }

    for (let i = 0; i < productos.length; i++) {

      if (productos[i].id_default_image.toString() === '' || productos[i].id_default_image.toString() === undefined) {

        json.imagenes.push('pasa');

      }else{

        let imagenes = productos[i].id.toString() + '/' + productos[i].id_default_image.toString();

        json.imagenes.push(imagenes);

      }

    }

    this.comunicacion.obtener_imagenes(json).subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {

        let imagen = this.sanitizer.bypassSecurityTrustStyle(`url(data:image/jpeg;base64,${data[i]})`);

        this.imagenes.push(imagen);

      }


    }, Error => {

      console.log(Error);

    });

  }


}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private comunicacion: ComunicacionService) {}

  sesion: Observable<string>;
  articulos: Observable<number>;
  contador: string = localStorage.getItem('carrito_contador');

  ngOnInit(){

  	this.comunicacion.estado_usuario().subscribe((data) => {

  		this.sesion = Observable.of(data);

  	}, Error => {

  		console.log(Error.message);

  	});

    if (localStorage.getItem('cliente_id')) {
      
      this.productos();

    }

  }

  productos() {

    if (localStorage.getItem('cliente_id') && localStorage.getItem('cliente_id') != 'Iniciar sesión') {

      this.get_products();

    }

  }

  get_products() {

     this.comunicacion.obtener_productos(localStorage.getItem('cliente_id')).subscribe((data: any) => {

        let info = [];

        if (data.length > 0) {
         
          for (let i = 0; i < data[0].carts[data[0].carts.length - 1].associations.cart_rows.length; i++) {
          
            info.push(data[0].carts[data[0].carts.length - 1].associations.cart_rows.length);

          }

        }

        this.comunicacion.actualizar_productos(info);
        this.comunicacion.obtener_productos_2().subscribe(data2 => {

          this.articulos = Observable.of(JSON.parse(data2).length);
          this.contador = '1';

          localStorage.setItem('carrito_contador', '1');

        }, Error => {

          console.log(Error);

        });

      }, Error => {

        console.log(Error);

    });

  }

}
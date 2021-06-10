import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  categorias: any = [{
    id: ['29', '30'], imagen: []
  }];

	slideOpts = {

    	initialSlide: 1,
    	speed: 400,
    	autoplay: true
    	
  	};

  productos: any = [{

      id: 254,
      ruta: "https://www.wonduu.com/1296177-home_default/bicicleta-spining-gh706-d33.jpg",
      price: "199.90",
      name: "Bicicleta spinning con volante de inercia 24 KG | INDOOR MOD706 | LOIRA"

  }, {

      id: 22566,
      ruta: "https://www.wonduu.com/510674-home_default/torre-de-ejercicios-con-banco-hdl-1010a.jpg",
      price: "148.75",
      name: "Torre de ejercicos con banco HDL-1010A"

  }, {

      id: 168,
      ruta: "https://www.wonduu.com/450246-home_default/banco-de-musculacion-multiusos.jpg",
      price: "147.50",
      name: "Banco de musculación multiusos"

  }, {

    id: 264201,
    ruta: "https://www.wonduu.com/1127202-home_default/mancuernas-convertibles-y-ajustables-10-kilos-30-kilos.jpg",
    price: "38.74",
    name: "Juego de mancuernas 2 en 1 con barra ajustable | peso de 10 KG a 50KG"

  }];

  constructor(private sanitizer: DomSanitizer, private comunicacion: ComunicacionService) {}

  ngOnInit() {

    this.ocultar_boton();

    const json = {

      categorias: this.categorias[0].id
      
    }

    this.comunicacion.home(json).subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {

        let imagen = this.sanitizer.bypassSecurityTrustStyle(`url(data:image/jpeg;base64,${data[i]})`);

        this.categorias[0].imagen.push(imagen);

      }

    }, Error => {

      console.log(Error);

    });

  }

  ocultar_boton() {

    this.comunicacion.cambiar_estado_boton('0');
    
  }

}

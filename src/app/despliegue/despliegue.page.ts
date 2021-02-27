import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-despliegue',
  templateUrl: './despliegue.page.html',
  styleUrls: ['./despliegue.page.scss'],
})
export class DesplieguePage implements OnInit {

	productos: any = [];
	id: string;

  constructor(private sanitizer: DomSanitizer, private activate: ActivatedRoute, private comunicacion: ComunicacionService) { }

  ngOnInit() {

  	let parametro = this.activate.snapshot.paramMap.get('id');
    let json = {id: parametro};

    this.id = parametro;

	this.obtener_productos(parametro);

  }

  async obtener_productos(id: string){

  	await this.comunicacion.sub_productos(this.id).subscribe((data: any) => {

  		this.productos = data;

  		for (let i = 0; i < this.productos.imagen.base64.length; i++) {

			let conversion = parseFloat(this.productos.precio[i]);
	      	let monto = conversion.toFixed(2);
			let info_imagen = 'data:image/jpeg;base64, ' + this.productos.imagen.base64[i];

			this.productos.imagen.base64[i] = this.sanitizer.bypassSecurityTrustUrl(info_imagen);
			this.productos.precio[i] = monto;

		}

  	}, Error => {

  		console.log(Error);

  	});

  }

}

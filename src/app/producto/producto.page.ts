import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router, ActivatedRoute } from '@angular/router';

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
	imagen: string;
  precio: string;
  descripcion: string;
  referencia: string;
	_productos: any = [
		{id: 1, nombre:"Producto 1", precio: "35", imagen: '../assets/img1.jpg'},
		{id: 2, nombre:"Producto 2", precio: "20", imagen: '../assets/img2.jpg'},
		{id: 3, nombre:"Producto 3", precio: "10", imagen: '../assets/img1.jpg'}
	];

  constructor(private comunicacion: ComunicacionService, private activate: ActivatedRoute) { }

  ngOnInit() {

    let parametro = this.activate.snapshot.paramMap.get('id');
    let json = {id: parametro};
    this.id = parametro;

  	this.comunicacion.productos_info(json).subscribe((data: any)=>{

  		let conversion = parseFloat(data[0].products[0].price);
      let monto = conversion.toFixed(2);
      
      this.precio = monto.toString();
      this.descripcion = data[0].products[0].description;
      this.nombre = data[0].products[0].name;
      this.referencia = data[0].products[0].reference;
      this.existencia = parseInt(data[0].products[0].quantity);
      this.imagen = data[1][""][1].id;

  		console.log(data);

  	}, Error => {

  		console.log(Error);

  	});

  }

  revision(){

  	let ocultar = document.getElementById('ocultar')
  	let mostrar = document.getElementById('desplegar')

  	if (this.ocultar) {

  		ocultar.style.display = 'block'
  		mostrar.style.display = 'none'

  	}else{

  		ocultar.style.display = 'none'
  		mostrar.style.display = 'block'

  	}

  }

}

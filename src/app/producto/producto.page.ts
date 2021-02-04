import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

	cantidad: number = 0
	ocultar: boolean = false
	imagen: string
	/*productos: any = {
		"nombre": ['Producto 1', 'Producto 2', 'Producto 3'],
		"precio": ['35', '20', '10'],
		"imagen": ['../assets/img1.jpg', '../assets/img2.jpg', '../assets/img1.jpg']
	}*/

	_productos: any = [
		{id: 1, nombre:"Producto 1", precio: "35", imagen: '../assets/img1.jpg'},
		{id: 2, nombre:"Producto 2", precio: "20", imagen: '../assets/img2.jpg'},
		{id: 3, nombre:"Producto 3", precio: "10", imagen: '../assets/img1.jpg'}
	];

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

  	/*this.comunicacion.imagenes().subscribe((data)=>{

  		this.imagen = data.toString();
  		console.log(data);

  	}, Error => {

  		console.log(Error);

  	});*/

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

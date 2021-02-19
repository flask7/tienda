import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

	productos: any;

  constructor(private activate: ActivatedRoute, private comunicacion: ComunicacionService) { }

  ngOnInit() {

  	const parametro = this.activate.snapshot.paramMap.get('id');

  	console.log(parametro);

  	const json = {
  		"id": parametro
  	}

  	this.comunicacion.productos(json).subscribe((data: any) => {

  		const sub_categorias = data.categories[0].associations.categories;
  		const productos = data.categories[0].associations.products;
  		let resultado = [];
  		let resultado2 = [];

  		console.log(sub_categorias);

  		for (let i = 0; i < sub_categorias.length; i++) {

  			resultado.push(sub_categorias[i].id);

  		}

  		for (let i = 0; i < productos.length; i++) {

  			resultado2.push(productos[i].id);

  		}

  		console.log(resultado, resultado2);

  		//this.productos.push(data);

  	}, Error => {

  		console.log(Error.message);

  	});

  }

}

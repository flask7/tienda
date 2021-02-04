import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

	imagenes: any = ['../assets/img1.jpg', '../assets/img2.jpg'];
	// productos: any = {
	// 	"nombre": ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4','Producto 5'],
	// 	"precio": ['35', '20', '10' ,'15'],
	// 	"imagen": ['../assets/img1.jpg', '../assets/img2.jpg', '../assets/img1.jpg', '../assets/img2.jpg']
	// }

	_productos: any = [
		{id: 1, nombre:"Producto 1", precio: "35", imagen: '../assets/img1.jpg'},
		{id: 2, nombre:"Producto 2", precio: "20", imagen: '../assets/img2.jpg'},
		{id: 3, nombre:"Producto 3", precio: "10", imagen: '../assets/img1.jpg'},
		{id: 4, nombre:"Producto 4", precio: "15", imagen: '../assets/img2.jpg'}
	];

	mas_vendidas: any = [
	'../assets/img1.jpg', '../assets/img2.jpg', '../assets/img1.jpg',
	 '../assets/img2.jpg', '../assets/img1.jpg', '../assets/img2.jpg']

  constructor() {}

  ngOnInit(){

  }

}

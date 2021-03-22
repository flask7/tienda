import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

	nombre: string;
	apellidos: string;
	correo: string;
	fecha: any;
	password: string;

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

  	this.obtener_datos();

  }

  obtener_datos(){

  	this.comunicacion.obtener_perfil(localStorage.getItem('cliente_id')).subscribe((data: any) => {

  		this.nombre = data.customers[0].firstname;
  		this.apellidos = data.customers[0].lastname;
  		this.correo = data.customers[0].email;
  		this.fecha = data.customers[0].birthday;

  	}, Error => {

  		console.log(Error.message);

  	});

  }

  editar(){

  	let json = {

  		nombre: this.nombre,
  		apellidos: this.apellidos,
  		correo: this.correo,
  		fecha: this.fecha.toString()

  	};

  	this.comunicacion.actualizar_perfil(json).subscribe((data: any) => {

  		console.log(data);

  	}, Error => {

  		console.log(Error.message);

  	});

  }

}

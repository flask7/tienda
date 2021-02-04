import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

	nombre: string;
	correo: string;
	password: string;
	fecha: any;
	apellido: string;

  constructor(private comunicacion: ComunicacionService, private router: Router) { }

  ngOnInit() {
  }

  registro(){

  	console.log(this.fecha);

  	const json = {

  		nombre: this.nombre,
  		apellido: this.apellido,
  		correo: this.correo,
  		fecha: this.fecha,
  		password: this.password

  	}

  	this.comunicacion.registro(json).subscribe((data:any) => {

  		if (data.length > 0) {

  			this.router.navigateByUrl('/');

  		}

  	}, Error => {

  		console.log(Error);

  	});

  }

}

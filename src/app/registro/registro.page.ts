import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private comunicacion: ComunicacionService, private router: Router, private alerta: AlertController) { }

  ngOnInit() {
  }

  async error_autenticacion(mensaje) {

    const alert = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Detalle:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  registro(){

  	const json = {

  		nombre: this.nombre,
  		apellido: this.apellido,
  		correo: this.correo,
  		fecha: this.fecha,
  		password: this.password

  	}

  	this.comunicacion.registro(json).subscribe((data:any) => {

  		if (data != 'Usuario registrado') {

        localStorage.setItem('sesion', 'activa');
        localStorage.setItem('usuario', data);

        this.comunicacion.usuario = data;
  			this.router.navigateByUrl('/');

  		}else{

        this.error_autenticacion('Usuario registrado');

      }

  	}, Error => {

      this.error_autenticacion(Error.message);

  		console.log(Error);

  	});

  }

}

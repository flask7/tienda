import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController } from '@ionic/angular';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

	correo: string;
  codigo: string;
  code: string;
  activador: number = 0;
	
  constructor(
    private comunicacion: ComunicacionService, 
    private alerta: AlertController, 
    private router: Router,
    private activate: ActivatedRoute) { }

  ngOnInit() {
  }

  async mensajeria(mensaje) {

    const alert = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      subHeader: 'Detalle:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  recuperar(){

		const json = {
  		correo: this.correo

  	};

  	this.comunicacion.recuperar(json).subscribe((data:any) => {

  		this.mensajeria('Correo de verificación enviado');
      this.code = data[0];
      this.activador = 1;

      localStorage.setItem('correo', data[1]);

  	}, Error => {

  		this.mensajeria(Error.message);

  		console.log(Error);

  	});

  }

  recuperar2(){

    if (this.codigo == this.code) {
     
      this.router.navigateByUrl('/tabs/recuperar2');

    }else{

      this.mensajeria('Código incorrecto');

    }

  }

}

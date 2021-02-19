import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController } from '@ionic/angular';
import { Form } from '@angular/Forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

	correo: string;
	confirmar: string;
	password: string;
	npassword: string;

  constructor(private comunicacion: ComunicacionService, private alerta: AlertController) { }

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

  	if (this.npassword == this.confirmar && this.confirmar != '' && this.confirmar != undefined) {
  		
  		const json = {
	  		correo: this.correo,
	  		password: this.npassword
	  	};

	  	this.comunicacion.recuperar(json).subscribe((data:any) => {

	  		this.mensajeria('Correo de verificación enviado');

	  	}, Error => {

	  		this.mensajeria(Error.message);

	  		console.log(Error);

	  	});

  	}else{

  		this.mensajeria('Las contraseñas no coinciden');

  	}

  }

}

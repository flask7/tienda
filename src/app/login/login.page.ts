import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	correo: string;
	password: string;

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

  login(){

  	const json = {

  		correo: this.correo,
  		password: this.password
      
  	}

  	this.comunicacion.login(json).subscribe((data:any) => {

  		console.log(data);

      if (data == 'Usuario no registrado') {

        this.error_autenticacion('Usuario no registrado');

        console.log('usuario no registrado');

      }else{

        if (data != 'Error de autenticación') {

          console.log('usuario en linea');

          localStorage.setItem('sesion', 'activa');
          localStorage.setItem('usuario', data);

          this.comunicacion.usuario = data;
          this.router.navigateByUrl('/');
          
        }else{

          this.error_autenticacion('Error de autenticación');

          console.log('Error de autenticación');

        }

      }

  	}, Error => {

      this.error_autenticacion(Error.message);

  		console.log(Error.message);

  	});

  }

}

import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	correo: string;
	password: string;
  usuario: Observable<string>;

  constructor(private comunicacion: ComunicacionService, private router: Router, private alerta: AlertController) { }

  ngOnInit() {

    this.comunicacion.estado_usuario().subscribe((data: any) => {

      if (data !== 'Iniciar sesión' || data == null) {

        this.redirect();
        
      }

    }, Error => {

      console.log(Error);

    });

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

      if (data == 'Usuario no registrado') {

        this.error_autenticacion('Usuario no registrado');

      }else{

        if (data != 'Error de autenticación') {

          localStorage.setItem('sesion', 'activa');
          localStorage.setItem('usuario', data[0]);
          localStorage.setItem('cliente_id', data[1]); 

          this.comunicacion.cambiar_estado_usuario(data[0]);
          this.redirect();
          
        }else{

          this.error_autenticacion('Error de autenticación');

        }

      }

  	}, Error => {

      this.error_autenticacion(Error.message);

  		console.log(Error.message);

  	});

  }

  redirect(){

    this.router.navigateByUrl('/tabs/tab2');

  }

}

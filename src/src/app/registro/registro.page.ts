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

	nombre: string = '';
	correo: string = '';
	password: string = '';
	fecha: any;
	apellido: string = '';

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

    if (this.nombre != '' || this.apellido != '' || this.correo != '' || this.fecha != undefined || this.password != '') {
     
      if (this.password != '1234') { 

        if (this.password.length < 4) {

          this.error_autenticacion('La contraseña debe ser mayor a 4 caracteres');

        }else{

          this.comunicacion.registro(json).subscribe((data:any) => {

            if (data != 'Usuario registrado') {

              localStorage.setItem('sesion', 'activa');
              localStorage.setItem('usuario', data[0]);
              localStorage.setItem('cliente_id', data[1][0]); 

              this.comunicacion.cambiar_estado_usuario(data[0]);
              this.router.navigateByUrl('/tabs/tab2');

            }else{        

              this.error_autenticacion('Usuario registrado');

            }

          }, Error => {

            this.error_autenticacion(Error.message);

            console.log(Error);

          });

        }

      }else{

        this.error_autenticacion('Contraseña inválida (no se admiten valores seguidos)');

      }

    }else{

      this.error_autenticacion('Todos los campos son obligatorios');

    }

  }

}

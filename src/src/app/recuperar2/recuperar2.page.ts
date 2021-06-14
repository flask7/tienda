import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController } from '@ionic/angular';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar2',
  templateUrl: './recuperar2.page.html',
  styleUrls: ['./recuperar2.page.scss'],
})
export class Recuperar2Page implements OnInit {

  npassword: string;
  confirmar: string;

  constructor(
    private comunicacion: ComunicacionService, 
    private alerta: AlertController, 
    private router: Router) { }

  ngOnInit() {

    if (!localStorage.getItem('correo')) {

      this.router.navigateByUrl('/tabs/login');
      
    }

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

    let json = {
      correo: localStorage.getItem('correo'),
      password: this.npassword
    }

    if (this.npassword != this.confirmar) {
      
      this.mensajeria('Las contraseñas no coinciden');

    }else{

      this.comunicacion.recuperar2(json).subscribe(data => {

        console.log(data);

        localStorage.removeItem('correo');
        this.mensajeria(data);
        this.router.navigateByUrl('/tabs/login');

      }, Error => {

        this.mensajeria(Error.message);

      });

    }

  }

}

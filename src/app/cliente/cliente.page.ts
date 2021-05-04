import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
	id: string = this.activate.snapshot.paramMap.get('id');
  respuesta: any = [];
  vendedores: any = [];
  pedidos: any = [];

  constructor(
  	private comunicacion: ComunicacionService, 
  	private alertController: AlertController,
  	private activate: ActivatedRoute) { }

  ngOnInit() {

    if (this.id == '1') {
      
      this.obtener_datos();

    }if (this.id == '3'){

      this.obtener_pedidos();

    }else{

      this.get_mensajes();

    }

  }

  async mensaje(mensaje) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      subHeader: '',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
    
  }

  obtener_datos(){

  	this.comunicacion.obtener_perfil(localStorage.getItem('cliente_id')).subscribe((data: any) => {

  		this.nombre = data.customers[0].firstname;
  		this.apellidos = data.customers[0].lastname;
  		this.correo = data.customers[0].email;
  		this.fecha = data.customers[0].birthday;

  	}, Error => {

  		console.log(Error.message);
  		this.mensaje('Error al obtener los datos');

  	});

  }

  editar(){

  	let json = {

  		id: localStorage.getItem('cliente_id'),
  		nombre: this.nombre,
  		apellidos: this.apellidos,
  		correo: this.correo,
  		password: this.password,
  		fecha: this.fecha.toString()

  	};

  	this.comunicacion.actualizar_perfil(json).subscribe((data: any) => {

  		this.mensaje(data);

  	}, Error => {

  		console.log(Error.message);
  		this.mensaje('Error al actualizar los datos');

  	});

  }

  get_mensajes(){

    const json = {
      id: localStorage.getItem('cliente_id')
    }

    this.comunicacion.obtener_mensajes_usuario(json).subscribe((data: any) => {

      if (data == 'Aún no tienes comentarios') {

        this.respuesta = data;

      }else{

        for (let i = 0; i < data.mensaje.length; i++) {

          this.vendedores.push({mensaje: data.mensaje[i], vendedor: data.vendedor[i]});

        }

      }

    }, Error => {

      this.mensaje('Error al obtener los mensajes');
      console.log(Error);

    });

  }

  obtener_pedidos(){

    const json = {

      id: localStorage.getItem('cliente_id')

    }

    this.comunicacion.pedidos(json).subscribe((data: any) => {
      
      for(let i = 0; i < data.orders.length; i++){

        this.pedidos.push(
            { 
              pago: data.orders[i].payment, 
              referencia: data.orders[i].reference, 
              total: parseFloat(data.orders[i].total_paid).toFixed(2) 
            }
          );

      }

    }, Error => {

      console.log(Error);
      this.mensaje('Error al obtener los pedidos');

    });

  }

}

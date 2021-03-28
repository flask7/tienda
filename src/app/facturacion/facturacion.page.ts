import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacionService } from '../comunicacion.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {

	nombre = this.activate.snapshot.paramMap.get('nombre');
	total = this.activate.snapshot.paramMap.get('precio');
	cantidad = this.activate.snapshot.paramMap.get('cantidad');
	precio: string;
	direcciones: any = [];
	direccion: number = 0;
	limite: number = 3;
	texto_dir: string = 'Mostrar todas las direcciones';
  loading: any;
  carrito: string = this.activate.snapshot.paramMap.get('carrito');
  id: string = this.activate.snapshot.paramMap.get('id');
  estado: string;
  id_direccion: string;

  constructor(
    private router: Router, 
    private alerta: AlertController, 
    private comunicacion: ComunicacionService, 
    private cargando: LoadingController, 
    private activate: ActivatedRoute) { }

  ngOnInit() {

    this.obtener_direcciones();

  	this.precio = ((parseFloat(this.total)/parseInt(this.cantidad)).toFixed(2)).toString();

  }

  async presentLoading() {

    this.loading = await this.cargando.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...'
    });

    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

  }

  async mensaje(mensaje) {

    const alert = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Detalle:',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  obtener_direcciones(){

    const cliente_id = localStorage.getItem('cliente_id');
    let direcciones = [];
    this.presentLoading();

    this.comunicacion.obtener_direcciones(cliente_id).subscribe((data:any) => {

      if (data.addresses) {

        for (let i = 0; i < data.addresses.length; i++) {

          let objeto = {
            "direccion": data.addresses[i].address1, 
            "id": data.addresses[i].id, 
            "id_estados": data.addresses[i].id_state
          };

          this.direcciones.push(objeto);
          direcciones.push(data.addresses[i].address1);
         
        }

      }

      this.comunicacion.actualizar_direcciones(this.direcciones);
      this.loading.dismiss();

    }, Error => {

      this.loading.dismiss();
      this.mensaje('Error al obtener los productos');

      console.log(Error.message);

    });

  }

  seleccionar(indice){

  	this.direccion = indice;

  }

  mostrar(){

  	this.direccion = 0;

  	if (this.limite == 3) {
  		
  		this.limite = this.direcciones.length;
  		this.texto_dir = 'Minimizar';

  	}else{

  		this.limite = 3;
  		this.texto_dir = 'Mostrar todas las direcciones';

  	}

  }

  comprar(dir){

    this.id_direccion = this.direcciones[dir - 1].id;
    this.estado = this.direcciones[dir - 1].id_estados;

  	let json = {

      id_cliente: localStorage.getItem('cliente_id'),
      id_direccion: this.id_direccion,
      id_carrito: this.carrito,
      id_estado: this.estado,
      pago: 'Transferencia',
      total: this.total,
      product_id: this.id,
      cantidad: this.cantidad

    }

    console.log(json);

    this.comunicacion.pago(json).subscribe((data) => {

      console.log('Pago');

    }, Error => {

      console.log(Error);

    });

  }

}

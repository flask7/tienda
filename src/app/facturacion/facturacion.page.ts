import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacionService } from '../comunicacion.service';

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

  constructor(private router: Router, private comunicacion: ComunicacionService, private activate: ActivatedRoute) { }

  ngOnInit() {

    this.obtener_direcciones();

  	this.precio = ((parseFloat(this.total)/parseInt(this.cantidad)).toFixed(2)).toString();

  }

  obtener_direcciones(){

    const cliente_id = localStorage.getItem('cliente_id');
    let direcciones = [];

    this.comunicacion.obtener_direcciones(cliente_id).subscribe((data:any) => {

      if (data.addresses) {

        for (let i = 0; i < data.addresses.length; i++) {
       
          let objeto = {"direccion": data.addresses[i].address1, "id": data.addresses[i].id};

          this.direcciones.push(objeto);
          direcciones.push(data.addresses[i].address1);
         
        }

      }

      this.comunicacion.actualizar_direcciones(this.direcciones);

    }, Error => {

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
  	
  }

}

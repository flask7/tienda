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

    const dir = localStorage.getItem('direcciones');

    if (dir) {

      this.direcciones = JSON.parse(localStorage.getItem('direcciones'));
      
    }

  	this.precio = ((parseFloat(this.total)/parseInt(this.cantidad)).toFixed(2)).toString();

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

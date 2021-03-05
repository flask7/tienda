import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

	info: any = [];
	products$: Observable<[]>;
  productos: Observable<Array<string>>;

  constructor(private comunicacion: ComunicacionService) {}

  ngOnInit(){

  	this.comunicacion.obtener_productos().subscribe((data:any) => {

  		this.products$ = data;

  		if (data != '') {
  			
        this.info.push(JSON.parse(data));

  			this.productos = Observable.of(this.info);

  		}else{

        this.productos = Observable.of([]);

      }


  	}, Error => {

  		console.log(Error.message);

  	});

  }

  eliminar_producto(id){

  }

}

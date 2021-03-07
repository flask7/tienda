import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private comunicacion: ComunicacionService) {}

  sesion: Observable<string>;

  ngOnInit(){

  	this.comunicacion.estado_usuario().subscribe((data) => {

  		this.sesion = Observable.of(data);

  	}, Error => {

  		console.log(Error.message);

  	});

  }

}

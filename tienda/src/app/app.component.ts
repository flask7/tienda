import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';

import { ComunicacionService } from './comunicacion.service';

import { Router } from  '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  items: any = this.comunicacion.items;
  usuario: Observable<string>;
  resultados: any = [];
  mostrar: string = 'N';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private menu: MenuController,
    private comunicacion: ComunicacionService,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit(){

    if (!localStorage.getItem('usuario')) {

      localStorage.setItem('usuario', 'Iniciar sesión');
      
    }else{

      this.comunicacion.cambiar_estado_usuario(localStorage.getItem('usuario'));

    }

    this.comunicacion.estado_usuario().subscribe((data) => {

      if (data === 'Iniciar sesión' || data == null) {

        this.mostrar = 'N';
        
      }else{

        this.mostrar = 'S';
        this.usuario = Observable.of(data);

      }

    }, Error => console.log(Error));

  }

  buscar(event){

    let busqueda = event.target.value;

    if (busqueda === '') {

      this.resultados = [];

    }else{

      this.comunicacion.buscador(busqueda).subscribe((data: any) => {

        this.resultados = data[0].products.product;

      }, Error => {

        console.log(Error)

      });
      
    }

  }

  cerrar(){

    localStorage.clear();
    localStorage.setItem('usuario', 'Iniciar sesión');

    this.mostrar = 'N';
    this.comunicacion.cambiar_estado_usuario('Iniciar sesión');
    this.usuario = Observable.of('Iniciar sesión');
    this.router.navigateByUrl('/tabs/login');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

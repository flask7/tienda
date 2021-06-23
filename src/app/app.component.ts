import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController, NavController } from '@ionic/angular';

import { ComunicacionService } from './comunicacion.service';

import { Router } from  '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';

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
  boton_activo: Observable<number>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private menu: MenuController,
    private comunicacion: ComunicacionService,
    private router: Router,
    public nav: NavController,
    private _location: Location
  ) {
    this.initializeApp();
  }

  ngOnInit(){
     
    this.comunicacion.estado_boton().subscribe(data => {

      this.boton_activo = Observable.of(parseInt(data));

    }, Error => { console.log(Error) });

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

      }

      this.usuario = Observable.of(data);

    }, Error => console.log(Error));

  }

  backClicked() {
    
    this._location.back();

  }

  buscar(event){

    let busqueda = event.target.value;

    if (busqueda == '' || busqueda == ' ') {

      this.resultados = [];

    } else {

      this.comunicacion.buscador(busqueda).subscribe((data: any) => {

        this.resultados = data[0].products.product;

        window.addEventListener('click', (e) => {

          this.resultados = [];

        });

      }, Error => {

        console.log(Error)

      });
      
    }

  }

  cerrar(){
    
    this.comunicacion.cerrar();

  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

  }
  
}

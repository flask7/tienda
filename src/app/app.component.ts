import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';

import { ComunicacionService } from './comunicacion.service';

import { Router } from  '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  items: any = this.comunicacion.items;
  usuario: string = this.comunicacion.usuario;

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

    if (this.comunicacion.usuario != undefined) {

      this.usuario = this.comunicacion.usuario;

    }else{

      this.usuario = 'Iniciar sesión';
      this.comunicacion.usuario = 'Iniciar sesión';

    }
    
  }

  cerrar(){

    localStorage.removeItem('sesion');
    localStorage.removeItem('usuario');
    
    this.comunicacion.usuario = 'Iniciar sesión';

    this.router.navigateByUrl('/tabs/login');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

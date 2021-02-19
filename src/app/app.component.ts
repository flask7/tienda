import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';

import { ComunicacionService } from './comunicacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  items: any = [
  {'nombre': 'Alimentacion y Bebida', 'id':'14043'}, 
  {'nombre': 'Artes gráficas', 'id': '45'}, 
  {'nombre': 'Material escolar', 'id': '7415'}, 
  {'nombre':'Industria', 'id': '28'},
  {'nombre': 'Deporte', 'id': '29'},
  {'nombre': 'Movilidad', 'id': '0'}, 
  {'nombre': 'Hogar', 'id': '26'}, 
  {'nombre': 'Jardín', 'id': '0'}, 
  {'nombre': 'Bricolage y herramientas', 'id': '0'}, 
  {'nombre': 'Electrónica', 'id': '0'}, 
  {'nombre':'Juguetes y Ocio', 'id': '677'},
  {'nombre': 'Mascotas', 'id': '0'}, 
  {'nombre': 'Salud y Belleza', 'id': '203'},
  {'nombre': 'Moda', 'id': '12976'}, 
  {'nombre':'Disfraces', 'id': '0'}];
  usuario: string = this.comunicacion.usuario;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private menu: MenuController,
    private comunicacion: ComunicacionService
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

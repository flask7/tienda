import { Component, OnInit } from '@angular/core';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {

	ubicacion: any = [];
  resultado: string;
  nombre: string;
  apellidos: string;
  empresa: string;
  cif: string;
  direccion: string;
  cp: string;
  ciudad: string;
  telefono: string;
  telefono2: string;
  direcciones: any = [];

  constructor(public geolocalizacion: Geolocation, public code: NativeGeocoder, private comunicacion: ComunicacionService) { }

  ngOnInit() {

  	this.geolocation();

    if (localStorage.getItem('direcciones')) {

      this.direcciones = JSON.parse(localStorage.getItem('direcciones'));
      
      this.comunicacion.actualizar_direcciones(this.direcciones);

    }

  }

  geolocation(){

    let latitud;
    let longitud;

    this.geolocalizacion.getCurrentPosition().then((posicion) => {

      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;

      this.geocodigo(latitud, longitud);

    }, Error => {

      console.log(Error);
      
    });

  }

  geocodigo(lat, lon){

  	let opciones: NativeGeocoderOptions = {
	    useLocale: true,
	    maxResults: 1
	};

  	this.code.reverseGeocode(lat, lon, opciones)
  	.then((result: NativeGeocoderResult[]) => {

      console.log(result);

      this.ubicacion = result[0];
      this.resultado = this.ubicacion.locality + ', ' + this.ubicacion.administrativeArea + ', ' + this.ubicacion.thoroughfare + ', ' + this.ubicacion.subLocality + ', ' + this.ubicacion.countryName;

    }).catch((error: any) => console.log(error));

  }

  add_location(){

    const json = {

      ubicacion: this.ubicacion,
      resultado: this.resultado,
      nombre: this.nombre,
      apellidos: this.apellidos,
      empresa: this.empresa,
      cif: this.cif,
      direccion: this.direccion,
      cp: this.cp,
      ciudad: this.ciudad,
      telefono: this.telefono,
      telefono2: this.telefono2

    };

    this.comunicacion.add_direccion(json);
    this.comunicacion.obtener_direcciones().subscribe((data:any) => {

      console.log(data);

      this.direcciones = data;

    }, Error => {

      console.log(Error);

    });


  }

  borrar(id){

  }


}

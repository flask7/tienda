import { Component, OnInit } from '@angular/core';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {

	ubicacion: any = [];

  constructor(public geolocalizacion: Geolocation, public code: NativeGeocoder) { }

  ngOnInit() {

  	let latitud;
  	let longitud;

  	this.geolocalizacion.getCurrentPosition().then((posicion) => {

  		latitud = posicion.coords.latitude;
  		longitud = posicion.coords.longitude;

  		this.geocodigo(latitud, longitud);

  	}, Error => {

  		console.log(Error);
  		this.ubicacion = Error;
  		
  	});


  }

  geocodigo(lat, lon){

  	let opciones: NativeGeocoderOptions = {
	    useLocale: true,
	    maxResults: 1
	};

  	this.code.reverseGeocode(lat, lon, opciones)
  	.then((result: NativeGeocoderResult[]) => this.ubicacion = JSON.stringify(result[0]))
  	.catch((error: any) => console.log(error));

  }

}

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
  resultado: string;

  constructor(public geolocalizacion: Geolocation, public code: NativeGeocoder) { }

  ngOnInit() {

  	let latitud;
  	let longitud;

  	this.geolocalizacion.getCurrentPosition().then((posicion) => {

  		latitud = posicion.coords.latitude;
  		longitud = posicion.coords.longitude;

      console.log(latitud, longitud);

  		this.geocodigo(latitud, longitud);

  	}, Error => {

  		console.log(Error);
  		
  	});


  }

  geocodigo(lat, lon){

    console.log(lat, lon);

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

}

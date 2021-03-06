import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController } from '@ionic/angular';

import { EventsService } from '../events.service';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {

  @ViewChild('content') private content: any;

	alias: any = "";
  ubicacion: any = [];
  resultado: string;
  nombre: string;
  apellidos: string;
  empresa: string = "";
  direccion: string;
  cp: string;
  ciudad: string;
  telefono: string;
  telefono2: string = "";
  direcciones: any = [];
  identificacion: string = "";
  resultados: any = [];
  estado_id: string;
  mostrar: number = 0;
  data_direcciones: any = [];
  adding: number = 0;
  edicion: string;
  mostrar_lista: number = 0;

  showingAddresses = true;

  constructor(
    public alertController: AlertController, 
    public geolocalizacion: Geolocation, 
    public code: NativeGeocoder, 
    public events: EventsService, 
    private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.comunicacion.cambiar_estado_boton('1');
    this.buscar();
  	this.geolocation();
    this.obtener_direcciones();

  }

  seleccionar(d)
  {
    let a:any= {};

    a.name =  d.direccion+','+d.postcode+', '+ d.city+', '+ d.estado+', España';
    a.id = d.id;

    localStorage.setItem('address',JSON.stringify(a));

    this.events.publish('updateAddress');
  }

  async alerta(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      subHeader: '',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
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

      this.ubicacion = result[0];
      this.resultado = this.ubicacion.locality + ', ' + this.ubicacion.thoroughfare + ', ' + this.ubicacion.subLocality + ', ' + this.ubicacion.countryName;
     // this.estado = this.ubicacion.administrativeArea;


    }).catch((error: any) => console.log(error));

  }

  validar(json: any){

    let valor = 0;
    let valores = Object.values(json);

    for(let i = 0; i < valores.length; i++){

      if(valores[i] == undefined || valores[i] == null || valores[i] == ""){
         
        this.alerta('Todos los campos son obligatorios');
        valor++;
        break;

      }

    }

    if(valor == 1){

      return 'Error';

    } else {

      return 'Funciona';

    }

  }

  async add_location(){

    const cliente_id = localStorage.getItem('cliente_id');
    const json = {

      cliente_id: parseInt(cliente_id),
      identificacion: this.identificacion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      // empresa: this.empresa,
      direccion: this.direccion,
      cp: this.cp,
      ciudad: this.ciudad,
      telefono: this.telefono,
      // telefono2: this.telefono2,
      estado: this.estado_id,
      alias: this.alias

    }

    const valida = {

      cliente_id: parseInt(cliente_id),
      // identificacion: this.identificacion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      // empresa: this.empresa,
      direccion: this.direccion,
      cp: this.cp,
      ciudad: this.ciudad,
      telefono: this.telefono,
      // telefono2: this.telefono2,
      estado: this.estado_id,
      alias: this.alias

    }

    let respuesta = this.validar(valida);

    if(respuesta == 'Funciona'){

      this.comunicacion.add_direccion(json).subscribe((data: any) => {

          this.direcciones = [];

          this.alerta(data[0]);
          this.blanquear_formulario();
          this.obtener_direcciones();
          this.showingAddresses = true;

        }, Error => {

          console.log(Error.message);

      });

    }

  }

  obtener_direcciones(){

    const cliente_id = localStorage.getItem('cliente_id');
    let direcciones = [];

    this.comunicacion.obtener_direcciones(cliente_id).subscribe((data:any) => {

      this.data_direcciones = data.addresses;

      if (data.addresses) {

        for (let i = 0; i < data.addresses.length; i++) {

          this.comunicacion.buscador_estado(data.addresses[i].id_state).subscribe((data1: any) => {

            let estado = "";
            if (data1[0].states.state) {
              estado = data1[0].states.state.name;
            }

            let objeto = { "alias": data.addresses[i].alias, "direccion": data.addresses[i].address1, "id": data.addresses[i].id,
            "postcode":data.addresses[i].postcode, "city":data.addresses[i].city, "estado": estado, "phone": data.addresses[i].phone };

            this.direcciones.push(objeto);
            direcciones.push(data.addresses[i].address1);

          });
       
         
        }

      }

      this.comunicacion.actualizar_direcciones(this.direcciones);

    }, Error => {

      console.log(Error.message);

    });

  }

  buscar() {

    this.comunicacion.buscador_estados().subscribe((data: any) => {

        this.resultados = data[0].states.state;

      }, Error => {

        console.log(Error.message);

    });

  }

  borrar(indice){

    this.comunicacion.eliminar_direccion(indice).subscribe((data: any) => {

      this.alerta(data);

      this.direcciones = [];

      this.obtener_direcciones();

    }, Error => {

      console.log(Error.message);

    });

    this.adding = 0;

  }

  editar(indice){

    let estado;
    let info = this.data_direcciones;
    this.edicion = indice;

    for (let i = 0; i < info.length; i++) {

      if (info[i].id == indice) {

        console.log(info);

        this.comunicacion.buscador_estado(info[i].id_state).subscribe((data: any) => {

            if (data[0].states.state) {
              
              estado = data[0].states.state.name;

            }else{

              estado = '';

            }

            this.llenar_formulario(info[i].dni, info[i].firstname, info[i].lastname, info[i].company, info[i].address1, info[i].postcode, info[i].city, info[i].phone, info[i].phone_mobile, info[i].id_state, info[i].alias);

          }, Error => {

            console.log(Error.message);

        });    

        break;

      }

    }

    this.adding = 1;

  }

  enviar_edicion(id: string){

    const json = {

      id: id,
      identificacion: this.identificacion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      empresa: this.empresa,
      direccion: this.direccion,
      cp: this.cp,
      ciudad: this.ciudad,
      telefono: this.telefono,
      telefono2: this.telefono2,
      estado: this.estado_id,
      alias: this.alias

    }

    this.comunicacion.actualizar_direccion(json).subscribe((data: any) => {

      this.alerta(data);

      this.adding = 0;
      this.direcciones = [];

      this.obtener_direcciones();
      this.blanquear_formulario();

    }, Error => {

      console.log(Error.message);

    });

  }

  blanquear_formulario(){

      this.alias = '';
      this.identificacion = '';
      this.nombre = '';
      this.apellidos = '';
      this.empresa = '';
      this.direccion = '';
      this.cp = '';
      this.ciudad = '';
      this.telefono = '';
      this.telefono2 = '';
     // this.estado = '';
      this.estado_id = '';
      // this.resultados = []; 

  }

  llenar_formulario(identificacion, nombre, apellidos, empresa, direccion, cp, ciudad, telefono, telefono2, estado_id, alias){

      this.identificacion = identificacion;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.empresa = empresa;
      this.direccion = direccion;
      this.cp = cp;
      this.ciudad = ciudad;
      this.telefono = telefono;
      this.telefono2 = telefono2;
     // this.estado = estado;
      this.estado_id = estado_id;
      this.alias = alias;

  }

  buscador_info(i){

    this.estado_id = this.resultados[i].id; 
    this.mostrar_lista = 0;

  }


  async scrolling(i: number){

    let id, h;
    this.mostrar = i + 1;

  }

}

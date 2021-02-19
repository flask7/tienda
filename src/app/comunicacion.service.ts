import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  usuario: string = localStorage.getItem('usuario');

  constructor(private http: HttpClient) { }

  login(json){

    const headers = {

      'Content-type': 'application/json'

    }

  	return this.http.post('http://localhost:8000/api/login', JSON.stringify(json), { headers })
  	
  }

  registro(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('http://localhost:8000/api/registro', JSON.stringify(json), { headers });

  }

  recuperar(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('http://localhost:8000/api/recuperar', JSON.stringify(json), { headers });

  }

  productos_data(){

  }

  productos(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('http://localhost:8000/api/productos', JSON.stringify(json), { headers });

  }


}

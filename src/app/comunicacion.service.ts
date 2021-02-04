import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  constructor(private http: HttpClient) { }

  login(json){

    const headers = {

      'Content-type': 'application/json'

    }

  	return this.http.post('http://localhost:5000/login', json, { headers })
  	
  }

  registro(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('http://localhost:5000/registro', json, { headers });

  }

  imagenes(){

  }

  productos(){

  }


}

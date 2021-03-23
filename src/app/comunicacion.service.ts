import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  items: any = [
  {'nombre': 'Alimentacion y Bebidas', 'id':'208'}, 
  {'nombre': 'Artes gráficas', 'id': '45'}, 
  {'nombre': 'Material escolar', 'id': '7415'}, 
  {'nombre':'Industria', 'id': '28'},
  {'nombre': 'Deporte', 'id': '29'},
  {'nombre': 'Movilidad', 'id': '27'}, 
  {'nombre': 'Hogar', 'id': '30'}, 
  {'nombre': 'Jardín', 'id': '7364'}, 
  {'nombre': 'Bricolage y herramientas', 'id': '2048'}, 
  {'nombre': 'Electrónica', 'id': '155'}, 
  {'nombre':'Juguetes y Ocio', 'id': '677'},
  {'nombre': 'Mascotas', 'id': '209'}, 
  {'nombre': 'Salud y Belleza', 'id': '203'},
  {'nombre': 'Moda', 'id': '7797'}, 
  {'nombre':'Disfraces', 'id': '11968'}];
  productos_almacenados: any = [];
  direcciones_registradas: any = [];
  private carrito = new BehaviorSubject('');
  private direcciones = new BehaviorSubject('');
  private mostrar = new BehaviorSubject('N');
  private usuario = new BehaviorSubject('Iniciar sesión');

  constructor(private http: HttpClient, private router: Router) { }

  cerrar() {

    localStorage.clear();
    localStorage.setItem('usuario', 'Iniciar sesión');

    this.mostrar.next('N');
    this.cambiar_estado_usuario('Iniciar sesión');
    this.router.navigateByUrl('/tabs/login');

  }

  estado_sesion(): Observable<string> {

    return this.mostrar.asObservable();

  }

  cambiar_estado_sesion(valor: string) {

    this.mostrar.next(valor);

  }

  obtener_productos(id: string): Observable<any> {

    const headers = {

      'Content-type': 'application/json'
      
    }

    let _json = {

      id: id

    };

   return this.http.post('https://tuwordpress.online/prestashop/public/api/get_carrito', JSON.stringify(_json), { headers });

  // return this.carrito.asObservable();

  }

  obtener_direcciones(json): Observable<any> {

    const headers = {

      'Content-type': 'application/json'
      
    }

    let _json = {

      id: json

    };

   return this.http.post('https://tuwordpress.online/prestashop/public/api/get_direcciones', JSON.stringify(_json), { headers });
  
   //return this.direcciones.asObservable();

  }

  estado_usuario(): Observable<string> {

   return this.usuario.asObservable();

  }

  cambiar_estado_usuario(usuario: any){

    this.usuario.next(usuario);
    
  }

  actualizar_productos(array){

    this.productos_almacenados = array;
    
    this.carrito.next(JSON.stringify(this.productos_almacenados));

  }

  actualizar_direcciones(array){

    this.direcciones_registradas = array;
    
    this.direcciones.next(JSON.stringify(this.direcciones));

  }

  add_direccion(json:any){

    let dir = json.direccion;
    const headers = {

      'Content-type': 'application/json'

    }

    this.direcciones_registradas.push(dir);
    this.direcciones.next(this.direcciones_registradas);

    localStorage.setItem('direcciones', JSON.stringify(this.direcciones_registradas));

    
    return this.http.post('https://tuwordpress.online/prestashop/public/api/direcciones', JSON.stringify(json), { headers })

  }

  add_producto(id_customer, id, precio, nombre, cantidad, direccion): Observable<any>{

    const json = {
      id_customer: id_customer,
      id: id,
      direccion: direccion,
      nombre: nombre,
      precio: ((parseFloat(precio) * parseInt(cantidad)).toFixed(2)).toString(),
      quantity: cantidad

    };

    const headers = {

      'Content-type': 'application/json'

    }

    this.productos_almacenados.push(json);
    this.carrito.next(JSON.stringify(this.productos_almacenados));
    localStorage.setItem('productos', JSON.stringify(this.productos_almacenados));

    return this.http.post('https://tuwordpress.online/prestashop/public/api/carrito', json, { headers });

  }

  eliminar_producto(id) {

    const json = {

      id: id,
      id_customer: localStorage.getItem('cliente_id')

    }

    const headers = {

      'Content-type': 'application/json'

    }

    for (let i = 0; i < this.productos_almacenados.length; i++) {

      if (id === this.productos_almacenados[i].id) {

        if (this.productos_almacenados.length == 1) {

          this.productos_almacenados = [];

        }else{

          this.productos_almacenados.splice(i, 1);

        }

      }
     
    }

    localStorage.setItem('productos', JSON.stringify(this.productos_almacenados));
    this.carrito.next(JSON.stringify(this.productos_almacenados));

    return this.http.post('https://tuwordpress.online/prestashop/public/api/eliminar_carrito', json, { headers });

  }

  login(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/login', JSON.stringify(json), { headers });
  	
  }

  registro(json){

     const headers = {

       'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/registro', JSON.stringify(json), { headers })

  }

  recuperar(json){

    const headers = {

      'Content-type': 'application/json'

    }

    //return this.http.post('http://localhost:8000/api/recuperar', JSON.stringify(json), { headers });
    return this.http.post('https://tuwordpress.online/prestashop/public/api/recuperar', JSON.stringify(json), { headers });

  }

  recuperar2(json){

    const headers = {

      'Content-type': 'application/json'

    }

   // return this.http.post('http://localhost:8000/api/recuperar2', JSON.stringify(json), { headers });
    return this.http.post('https://tuwordpress.online/prestashop/public/api/recuperar2', JSON.stringify(json), { headers });

  }

  productos_data(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/productos_data', JSON.stringify(json), { headers });

  }

  productos(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/productos', JSON.stringify(json), { headers });

  }

  productos_info(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/productos_info', JSON.stringify(json), { headers });

  }

  imagenes(id){

    const headers = {

      'Content-type': 'application/json'

    }

    const json = {
      producto: id
    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/imagenes_data', json, { headers });

  }

  sub_productos(id: string){

    const headers = {

      'Content-type': 'application/json'

    }

    const json = {

      categoria: id

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/sub_pruductos', json, { headers });
    
  }

  obtener_imagenes(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/imagenes', JSON.stringify(json), { headers });

  }

  home(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/imagenes_categorias', JSON.stringify(json), { headers });

  }

  relacionados(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/relacionados', JSON.stringify(json), { headers });

  }

  buscador(busqueda: string){

    const headers = {

      'Content-type': 'application/json'

    }

    const json = {
      busqueda: busqueda
    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/buscador', json, { headers });

  }

  buscador_estados(/*busqueda: string*/){

    const headers = {

      'Content-type': 'application/json'

    }

    /*const json = {
      busqueda: busqueda
    }*/

    return this.http.get('https://tuwordpress.online/prestashop/public/api/buscador_estados'/*, json*/, { headers });

  }

   buscador_estado(busqueda: string){

    const headers = {

      'Content-type': 'application/json'

    }

    const json = {
      id: busqueda
    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/buscador_estado', json, { headers });

  }

  actualizar_direccion(json: any){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/actualizar_direcciones', json, { headers });

  }

  eliminar_direccion(id: string){

    const headers = {

      'Content-type': 'application/json'

    }

    const json = {
      id: id
    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/eliminar_direcciones', json, { headers });

  }

  obtener_perfil(json): Observable<any> {

    const headers = {

      'Content-type': 'application/json'
      
    }

    let _json = {

      id: json

    };

//return this.http.post('http://localhost:8000/api/perfil', JSON.stringify(_json), { headers });
   return this.http.post('https://tuwordpress.online/prestashop/public/api/perfil', JSON.stringify(_json), { headers });

  }

  actualizar_perfil(json: any){

    const headers = {

      'Content-type': 'application/json'

    }

    //return this.http.post('http://localhost:8000/api/actualizar_perfil', json, { headers });

    return this.http.post('https://tuwordpress.online/prestashop/public/api/actualizar_perfil', json, { headers });

  }

}

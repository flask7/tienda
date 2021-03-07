import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

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
  {'nombre': 'Electrónica', 'id': '216'}, 
  {'nombre':'Juguetes y Ocio', 'id': '677'},
  {'nombre': 'Mascotas', 'id': '0'}, 
  {'nombre': 'Salud y Belleza', 'id': '203'},
  {'nombre': 'Moda', 'id': '12976'}, 
  {'nombre':'Disfraces', 'id': '0'}];
  productos_almacenados: any = [];
  private carrito = new BehaviorSubject('');
  private usuario = new BehaviorSubject('Iniciar sesión');

  constructor(private http: HttpClient) { }

  obtener_productos(): Observable<any> {

   return this.carrito.asObservable();

  }

  estado_usuario(): Observable<string> {

   return this.usuario.asObservable();

  }

  cambiar_estado_usuario(usuario){

    this.usuario.next(usuario);

  }

  add_producto(id, precio, nombre, cantidad){

    let mensaje;
    let info;
    const json = {

      id: id,
      nombre: nombre,
      precio: ((parseFloat(precio) * parseInt(cantidad)).toFixed(2)).toString(),
      cantidad: cantidad

    };

    this.obtener_productos().subscribe((data) => {

      info = data;

    }, Error => {

      console.log(Error.message);

    });

    if (info.length > 0) {
       
      let datos = JSON.parse(info);

      for (let i = 0; i < datos.length; i++) {
     
        if (datos[i].id === id) {

          return 'Ya ha seleccionado este producto';

        }

      }

      this.productos_almacenados.push(json);
      this.carrito.next(JSON.stringify(this.productos_almacenados));

      return 'producto añadido exitosamente';

    }else{

      this.productos_almacenados.push(json);
      this.carrito.next(JSON.stringify(this.productos_almacenados));

      return 'producto añadido exitosamente';

    }

  }

  eliminar_producto(id) {

    for (let i = 0; i < this.productos_almacenados.length; i++) {

      if (id === this.productos_almacenados[i].id) {

        if (this.productos_almacenados.length == 1) {

          this.productos_almacenados = [];

        }else{

          this.productos_almacenados.splice(i, 1);

        }

      }
     
    }

    this.carrito.next(JSON.stringify(this.productos_almacenados));

  }

  login(json){

    const headers = {

      'Content-type': 'application/json'

    }

  	return this.http.post('https://tuwordpress.online/prestashop/public/api/login', JSON.stringify(json), { headers })
  	
  }

  registro(json){

     const headers = {

       'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/registro', JSON.stringify(json), { headers });

  }

  recuperar(json){

    const headers = {

      'Content-type': 'application/json'

    }

    return this.http.post('https://tuwordpress.online/prestashop/public/api/recuperar', JSON.stringify(json), { headers });

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


}

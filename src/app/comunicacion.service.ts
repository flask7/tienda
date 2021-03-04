import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  usuario: string = localStorage.getItem('usuario');

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

  constructor(private http: HttpClient) { }

  private data = new BehaviorSubject('');
  data$ = this.data.asObservable();

  control_usuario(data: string) {
    this.data.next(JSON.parse(data));
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

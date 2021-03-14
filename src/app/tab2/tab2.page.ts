import { Component, OnInit  } from '@angular/core';
import { Router } from  '@angular/router';
import { ComunicacionService } from '../comunicacion.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {

  nombre: Observable<any>;
  items: any = [{'nombre': 'Información', 'id':'1'}, 
  {'nombre': 'Mis direcciónes de envío', 'id': '2'}, 
  {'nombre': 'Mis pedidos', 'id': '3'}, 
  {'nombre':'Lista de deseos', 'id': '4'},
  {'nombre': 'Facturas', 'id': '5'},
  {'nombre': 'Cupones', 'id': '6'}, 
  {'nombre': 'Recompensas', 'id': '7'}, 
  {'nombre': 'Trae un amigo (patrocinador)', 'id': '8'}, 
  {'nombre': 'Mis opiniones', 'id': '9'}, 
  {'nombre': 'Salir', 'id': '10'}]

  constructor(private router: Router, private comunicacion: ComunicacionService) {}

  ngOnInit(){

    this.comunicacion.estado_usuario().subscribe((data:any) => {

      if (data.toString() == 'Iniciar sesión' || data == null) {

        this.redireccion();
        
      }else{

        this.nombre = Observable.of(data);

      }

    }, Error => {

      console.log(Error);

    });

  }

  redireccion(){
      
    this.router.navigateByUrl('/tabs/login');
    
  }

}

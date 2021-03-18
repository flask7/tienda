import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  categorias: any = [{
    id: ['29', '216', '217', '27'], imagen: []
  }];

	slideOpts = {

    	initialSlide: 1,
    	speed: 400,
    	autoplay: true
    	
  	};

  constructor(private sanitizer: DomSanitizer, private comunicacion: ComunicacionService) {}

  ngOnInit(){

    const json = {
      categorias: this.categorias[0].id
    }

    this.comunicacion.home(json).subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {

        let imagen = this.sanitizer.bypassSecurityTrustStyle(`url(data:image/jpeg;base64,${data[i]})`);

        this.categorias[0].imagen.push(imagen);

      }
      

    }, Error => {

      console.log(Error);

    });

  }

}

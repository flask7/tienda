import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	correo: string;
	password: string;

  constructor(private comunicacion: ComunicacionService, private router: Router) { }

  ngOnInit() {
  }

  login(){

  	const json = {
  		correo: this.correo,
  		password: this.password
  	}

  	this.comunicacion.login(json).subscribe((data:any) => {

  		console.log(data);

  		if (data.data.customers.length > 0) {

  			console.log('usuario en linea');

        localStorage.setItem('sesion', 'activa');
  			this.router.navigateByUrl('/');
  			
  		}else{

  			console.log('usuario no registrado');

  		}

  	}, Error => {

  		console.log(Error);

  	});

  }

}

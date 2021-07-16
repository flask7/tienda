import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cliente',
        loadChildren: () => import('../cliente/cliente.module').then(m => m.ClientePageModule)
      },
      {
        path: 'categories/:id',
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'producto/:categoria/:id',
        loadChildren: () => import('../producto/producto.module').then( m => m.ProductoPageModule)
      },
      {
        path: 'despliegue/:id',
        loadChildren: () => import('../despliegue/despliegue.module').then(m => m.DesplieguePageModule)
      },
      {
        path: 'recuperar',
        loadChildren: () => import('../recuperar/recuperar.module').then(m => m.RecuperarPageModule)
      },
      {
        path: 'recuperar2',
        loadChildren: () => import('../recuperar2/recuperar2.module').then(m => m.Recuperar2PageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then(m => m.RegistroPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule)
      },
      {
        path: 'resenas',
        loadChildren: () => import('../resenas/resenas.module').then( m => m.ResenasPageModule)
      },
      {
        path: 'historial-pedidos',
        loadChildren: () => import('../historial-pedidos/historial-pedidos.module').then( m => m.HistorialPedidosPageModule)
      },
      {
        path: 'geolocalizacion',
        loadChildren: () => import('../geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule)
      },
      {
        path: 'info-personal/:id',
        loadChildren: () => import('../info-personal/info-personal.module').then( m => m.InfoPersonalPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

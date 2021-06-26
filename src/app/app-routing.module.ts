import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'producto/:categoria/:id',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'despliegue/:id',
    loadChildren: () => import('./despliegue/despliegue.module').then( m => m.DesplieguePageModule)
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule)
  },
  {
    path: 'facturacion/:carrito',
    loadChildren: () => import('./facturacion/facturacion.module').then( m => m.FacturacionPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'recuperar2',
    loadChildren: () => import('./recuperar2/recuperar2.module').then( m => m.Recuperar2PageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'resenas',
    loadChildren: () => import('./resenas/resenas.module').then( m => m.ResenasPageModule)
  },
  {
    path: 'historial-pedidos',
    loadChildren: () => import('./historial-pedidos/historial-pedidos.module').then( m => m.HistorialPedidosPageModule)
  },
  {
    path: 'info-personal/:id',
    loadChildren: () => import('./info-personal/info-personal.module').then( m => m.InfoPersonalPageModule)
  },
  {
    path: 'terminos',
    loadChildren: () => import('./terminos/terminos.module').then( m => m.TerminosPageModule)
  },
  {
    path: 'politicas',
    loadChildren: () => import('./politicas/politicas.module').then( m => m.PoliticasPageModule)
  },
  {
    path: 'cookies',
    loadChildren: () => import('./cookies/cookies.module').then( m => m.CookiesPageModule)
  },
  {
    path: 'distribuidor',
    loadChildren: () => import('./distribuidor/distribuidor.module').then( m => m.DistribuidorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

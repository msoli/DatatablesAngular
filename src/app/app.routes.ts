import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AlmacenComponent} from './components/almacen/almacen.component';


const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'almacen', component: AlmacenComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

// puede ser  la clase de de abajo o este codigo para exportar las rutas
// export const APP_ROUTING = RouterModule.forRoot((APP_ROUTES));

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)// use hash para usar el # y ser mas eficiente para el manejo de variables
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}


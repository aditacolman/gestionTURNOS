import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'turnos',
    loadChildren: () => import('./turnos/turnos.module').then( m => m.TurnosPageModule)
  },

  {
    path: 'editar-p',
    loadChildren: () => import('./editar-p/editar-p.module').then( m => m.EditarPPageModule)
  },
  {
    path: 'listado-clientes',
    loadChildren: () => import('./listado-clientes/listado-clientes.module').then( m => m.ListadoClientesPageModule)
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

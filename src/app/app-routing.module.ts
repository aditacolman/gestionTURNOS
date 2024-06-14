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
    path: 'turnos',
    loadChildren: () => import('./turnos/turnos.module').then( m => m.TurnosPageModule)
  },

  {
    path: 'editar-p',
    loadChildren: () => import('./editar-p/editar-p.module').then( m => m.EditarPPageModule)
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

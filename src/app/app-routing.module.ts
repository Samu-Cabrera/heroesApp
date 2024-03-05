import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNofoundPageComponent } from './shared/pages/error-nofound-page/error-nofound-page.component';
import { authCanActivate, canMatch } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [
      authCanActivate
    ],
    canMatch: [
      canMatch
    ]
  },
  {
    path: '404',
    component: ErrorNofoundPageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    // que sea exactamente ''
    pathMatch: 'full'
  }, 
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

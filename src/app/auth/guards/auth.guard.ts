import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


//estado del login
const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated){
          router.navigate(['/auth/login']);
        }
      })
    )
  ;
}

export const canMatch: CanMatchFn = ( 
  route: Route, 
  urlSegments: UrlSegment[]
) => {
  return checkAuthStatus();
};

export const authCanActivate: CanActivateFn = ( 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: `
    button {
      width: 150px;
    }  
  `
})
export class LoginPageComponent {
  constructor(  
    private authService: AuthService,
    private router: Router
  ){}

  onLogin():void {
    this.authService.login('samu@gmail.com', '123abc')
      .subscribe(user => {
        this.router.navigateByUrl('/');
      })
  }

  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  login() {
    // Ir al backend
    // un usuario
    // 
    this._authService.login()
      .subscribe(res => {
        console.log(res);

        if (res.id) {
          this._router.navigate(['./heroes'])
        }
      })
  }

  ingresarSinLogin() {
    this._authService.logout();
    this._router.navigate(['/heroes']);
  }

}

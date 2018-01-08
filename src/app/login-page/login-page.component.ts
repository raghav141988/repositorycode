import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service.ts.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }
  
    ngOnInit() {
    }
  
    login() {
      this.authService.loginWithGoogle().then((data) => {
        this.router.navigate(['']);
      })
    }

}

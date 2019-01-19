import { AuthService } from './../Services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login();
  }

  logout() {
    this.logout();
  }

}

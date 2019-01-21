import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "../provider/async-http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private service: AsyncHttpService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.service.get('/assets/data/login.json', { email: this.email, password: this.password }).subscribe(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        location.href = './projects';
      }
    })
  }

}

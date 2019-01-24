import { Component, OnInit } from '@angular/core';
import { AsyncHttpService } from "../provider/async-http.service";
import { NotificationService } from "../provider/notification";
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  request: string = 'login';

  userLogin: FormGroup;

  constructor(private service: AsyncHttpService, 
  private router: Router, 
  private notification: NotificationService,
  private fb: FormBuilder) { }

  ngOnInit() {

    this.userLogin = this.fb.group({
      emailAddr: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {
    this.service.get('/assets/data/login.json', { email: this.email, password: this.password }).subscribe(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        location.href = './projects';
      }
    })
  }

  register() {
    this.notification.updateNotification({
    show: true,
    status: '500',
    message: 'Server is not ready'
  })
    this.request = 'register';
  }

}

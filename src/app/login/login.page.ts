import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = {
    email: null,
    password: null
  };

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    console.log('Login clicked!');
  }
  onSubmit() {

  }

onRegister() {
  this.router.navigate(['/register']);
}

async tryLogin() {
  }



}

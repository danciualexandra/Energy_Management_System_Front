import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoginService) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required,],
      password: [null, Validators.required]
    });
  }

  login() {


    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.service.authenticate(username, password).subscribe((res: any) => {
      this.service.login(username, password).subscribe((res: any) => {
          let role = res.role;
          if (role == 'ADMINISTRATOR') {
            this.router.navigate(['/admin']);
          } else if (role == 'CLIENT') {
            this.router.navigate(['/client/' + res.uuid]);
          }
          localStorage.setItem('id', res.uuid);
        },
        error => {
          alert("Eroare login!!")
        });
    },
      error=> {
        alert("Eroare token!!")
      });
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackBarService) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required])
    });
  }

  new() {
    this.router.navigateByUrl('/user/new');
  }

  login() {
    if(this.loginForm.invalid) {
      this.snackBar.alert("Login inválido!");
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      auth => {

        console.log(auth.detail)
        let user:User = JSON.parse(auth.detail);
        user.pwd = null;

        console.log(auth.detail)

        this.authService.setUser(user);

        this.router.navigateByUrl('/home');
      },
      err => {
        switch(err.error.status) {
          case 400:
            this.snackBar.alert(err.error.message, err.error.status);
          break;
          case 401:
            this.snackBar.alert(err.error.message, err.error.status);
          break;
          default:
            this.snackBar.error(err.error.message, err.error.status);
          break;
        }
      }
    );
  }
}

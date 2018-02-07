import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        console.log(1234);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessages.show('登录成功', {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      }
    });
  }
}

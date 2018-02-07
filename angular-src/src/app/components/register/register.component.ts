import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('请提供所有信息', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('无效邮箱', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    // register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('注册成功', {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('注册失败', {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        this.router.navigate(['/register']);
      }
    });
  }
}

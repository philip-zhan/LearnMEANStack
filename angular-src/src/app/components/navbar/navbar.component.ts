import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('成功退出登录', {
      cssClass: 'alert-success',
      timeout: 2000
    });
    this.router.navigate(['/login']);
    return false;
  }
}

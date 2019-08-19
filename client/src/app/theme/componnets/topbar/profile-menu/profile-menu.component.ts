import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'app-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class TopbarProfileMenuComponent {
  badgeCount: number = 7;
  user = {};

  constructor(
    private authService: NbAuthService,
    protected router: Router
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid) {
          this.user = { ...this.user, ...token.getPayload()}
        }
      });
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  logout() {
    this.authService.logout('email')
      .subscribe((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.router.navigate(['auth/login']);
        }
      });
  }
}

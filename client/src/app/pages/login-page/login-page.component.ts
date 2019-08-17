import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  form: FormGroup;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('kirillzhurin@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    });
  }

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    const { controls } = this.form;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }

    this.form.disable();
    this.sub = this.authService.authenticate('email', this.form.value).subscribe((result: NbAuthResult) => {
      if(result.isSuccess()) {
        this.messages = result.getMessages();
        this.notification.success(
          'Logged In',
          this.messages[0]
        )
        this.router.navigate(['/dashboard']);
      } else {
        this.errors = result.getErrors();
        this.notification.error('Not Logged In', this.errors[0]);
        this.form.enable();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

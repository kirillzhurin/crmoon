import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  form: FormGroup;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  private passwordMatchValidator(g: FormGroup) {
    let password: AbstractControl = g.get('password');
    let confirm: AbstractControl = g.get('confirm');
    let result = null;
    let errorId = 'mismatch';

    if (password.value !== confirm.value) {
      result = { [errorId] : true };
      // Adding mismatch error for confirm control
      if (!confirm.errors) {
        confirm.setErrors(result)
      }
      return result;
    }

    // Removing mismatch error for confirm control
    if (confirm.errors && confirm.hasError(errorId)) {
      if (Object.keys(confirm.errors).length > 1) {
          delete confirm.errors[errorId];
      } else {
          confirm.setErrors(null);
      }
    }
    return result;
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl(null, [Validators.required])
    }, this.passwordMatchValidator);
  }

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  get username() {
    return this.form.controls.username
  }

  get confirm() {
    return this.form.controls.confirm
  }

  submitForm(): void {
    const { controls } = this.form;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }
    const { username, email, password } = this.form.value;
    this.form.disable();

    this.authService.register('email', {username, email, password}).subscribe((result: NbAuthResult) => {
      if(result.isSuccess()) {
        this.messages = result.getMessages();
        this.notification.success('Registered', this.messages[0]);
        this.router.navigate(['/auth/login'], {
          queryParams: {
            registered: true
          }
        });
      } else {
        this.errors = result.getErrors();
        this.notification.error('Not Registered', this.errors[0]);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      email: ['kirillzhurin@gmail.org', [Validators.required, Validators.minLength(4)]],
      password: ['123456', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) return
    //this.authService.SignIn(this.email.value, this.password.value)
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  backgroundNumber = 1;
  backgroundEnabled = true;
  year = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
  }

  changeBackground(): void {
    this.backgroundEnabled = true
    this.backgroundNumber === 5 ? (this.backgroundNumber = 1) : (this.backgroundNumber += 1)
  }

  toggleBackground(): void {
    this.backgroundEnabled = !this.backgroundEnabled
  }

}




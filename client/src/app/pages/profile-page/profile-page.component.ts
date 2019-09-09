import { Component, OnInit } from '@angular/core';
declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  photo = data.photo
  constructor() { }

  ngOnInit() {
  }

}

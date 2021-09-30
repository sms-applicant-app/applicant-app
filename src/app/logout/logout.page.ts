import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.SignOut();
  }

}

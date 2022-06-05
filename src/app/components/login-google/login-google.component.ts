/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
declare const google: any;
@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
})
export class LoginGoogleComponent implements OnInit {
  messErr: string;
  messSuccess: string;
  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: environment.googleAuth.clientId,
      callback: this.handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('signinDiv'),
      {theme: 'outline', size: 'large'}
    );
  }

  handleCallbackResponse = (response) => {
    console.log('id_Token', response.credential);
    this.authService.googleAuthUser(response.credential).then((data: any) =>{
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        this.messErr = '';
        this.messSuccess = 'Register success';
        this.ref.detectChanges();
      }
    }).catch(err => {
      this.messErr = err;
    });;
  }
}

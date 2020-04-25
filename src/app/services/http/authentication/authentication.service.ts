import { Injectable } from '@angular/core';
import { HttpServiceService} from 'src/app/services/http/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpServiceService) { }

  register(registerData): any {
    return this.http.postData(registerData, '/user/register').toPromise();
  }

  login(loginData): any {
    return this.http.postData(loginData, '/user/login').toPromise();
  }
}

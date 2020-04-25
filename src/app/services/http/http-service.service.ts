import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public url  = 'http://192.168.43.247:8000/api';

  public added_link: string;
  public data: any;
  public header: any;
  constructor( public http: HttpClient) { }

  setHeaders(token) {
    let header  = new HttpHeaders();

    if (token == null) {
      header = header.set('Content-Type', 'application/json');
    } else {

      header = header.set('Authorization', token);
    }

    return header;
  }

postData(item, added_url, token?: any) {

  return this.http.post(this.url+added_url, item, {headers: this.setHeaders(token)});
}

getData(added_url, token?: any) {
  return this.http.get(this.url+added_url, { headers: this.setHeaders(token)});
}

putData(item, added_url, token?: any) {
   return this.http.put(this.url+added_url, item, {headers: this.setHeaders(token)});
}

deleteData(added_url, token?: any) {
  return this.http.delete(this.url+added_url, {headers: this.setHeaders(token)});
}

}

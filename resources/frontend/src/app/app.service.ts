import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs'; 


@Injectable()
export class AppService {

  protected url : string = 'http://localhost:8000/api/payment';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {
    
  }

  // Rest Items Service: Read all REST Items
  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(map(data => data));
  }

  payProcess(data) {
    return this.http
      .post<any[]>(this.url + "/charge", data)
      .pipe(map(data => data));
  }

  

}

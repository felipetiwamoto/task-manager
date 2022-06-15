import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private env = environment;

  constructor(private http: HttpClient) { }

  get<Type>(route: string, query: string = "") : Observable<Type>{
    return this.http.get<Type>(`${this.env.api.url}/${route}`);
  }

  post<Type>(route: string, body: Object = {}) : Observable<Type>{
    return this.http.post<Type>(`${this.env.api.url}/${route}`, body);
  }

  put<Type>(route: string, body: Object = {}) : Observable<Type>{
    return this.http.put<Type>(`${this.env.api.url}/${route}`, body);
  }

  patch<Type>(route: string, body: Object = {}) : Observable<Type>{
    return this.http.patch<Type>(`${this.env.api.url}/${route}`, body);
  }

  delete<Type>(route: string, body: Object = {}) : Observable<Type>{
    return this.http.delete<Type>(`${this.env.api.url}/${route}`, body);
  }
}

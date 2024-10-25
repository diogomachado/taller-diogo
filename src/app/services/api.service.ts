import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // We could to move this to environments
  apiUrl = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  private dataUrl = 'api/datas';

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.dataUrl)
  }
}

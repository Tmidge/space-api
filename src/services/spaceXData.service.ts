import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {

  constructor(private httpClient: HttpClient) { }

  public getLaunches(): Observable<any> {
    return this.httpClient.get('https://api.spacexdata.com/v4/launches');
  }
}
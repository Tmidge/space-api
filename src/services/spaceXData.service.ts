import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpaceXLaunch {
  auto_update: boolean;
  capsules: any;
  cores: any;
  crew: any;
  date_local: Date;
  date_precision: string;
  date_unix: number;
  date_utc: Date;
  details: string;
  failures: any;
  fairings: any;
  flight_number: number;
  id: string;
  launch_library_id: any;
  launchpad: string;
  links: any;
  name: string;
  net: boolean;
  payloads: Array<string>;
  rocket: string;
  ships: Array<any>;
  static_fire_date_unix: number;
  static_fire_date_utc: Date;
  success: boolean;
  tbd: boolean;
  upcoming: boolean;
  window: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {

  constructor(private httpClient: HttpClient) { }

  public getLaunches(): Observable<any> {
    return this.httpClient.get('https://api.spacexdata.com/v4/launches');
  }
}
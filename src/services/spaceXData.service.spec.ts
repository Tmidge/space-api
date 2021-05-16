import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpaceXDataService } from 'src/services/spaceXData.service';
import { of } from 'rxjs';

const mockData = [
  {
    auto_update: true,
    capsules: [],
    cores: [{}],
    crew: [],
    date_local: "2006-03-25T10:30:00+12:00",
    date_precision: "hour",
    date_unix: 1143239400,
    date_utc: "2006-03-24T22:30:00.000Z",
    details: "Engine failure at 33 seconds and loss of vehicle",
    failures: [{}],
    fairings: {reused: false, recovery_attempt: false, recovered: false, ships: Array(0)},
    flight_number: 1,
    id: "5eb87cd9ffd86e000604b32a",
    launch_library_id: null,
    launchpad: "5e9e4502f5090995de566f86",
    links: {patch: {}, reddit: {}, flickr: {}, presskit: 'test.com', webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88"},
    name: "FalconSat",
    net: false,
    payloads: ["5eb0e4b5b6c3bb0006eeb1e1"],
    rocket: "5e9d0d95eda69955f709d1eb",
    ships: [],
    static_fire_date_unix: 1142553600,
    static_fire_date_utc: "2006-03-17T00:00:00.000Z",
    success: false,
    tbd: false,
    upcoming: false,
    window: 0,
  }
]

describe('SpaceXDataService', () => {
  let service: SpaceXDataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.get(SpaceXDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should get the launches', () => {
    const getLaunches = service.getLaunches().subscribe(result => {
       expect(result).toEqual(mockData)
    });

    httpMock.expectOne('https://api.spacexdata.com/v4/launches').flush(mockData);
    getLaunches.unsubscribe();
  });
});

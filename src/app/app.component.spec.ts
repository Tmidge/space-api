import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpaceXDataService, SpaceXLaunch } from 'src/services/spaceXData.service';
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

export class SpaceXDataServiceMock {
  getLaunches(): any {
    return of(mockData);
  }
}

describe('AppComponent', () => {
  const documentStub = {
    location: jasmine.createSpyObj('location', ['href'])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: 'document', useValue: documentStub },
        { provide: SpaceXDataService, useClass: SpaceXDataServiceMock}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'space-api'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('space-api');
  });

  it('should set filter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const expectedText = 'test';
    const event = ({ target: { value: expectedText }} as any)
    app.applyFilter(event);

    expect(app.dataSource.filter).toBe(expectedText)
  });

  it('should get year', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const date = new Date()
    const year = app.getYear(date);

    expect(year).toBe(date.getUTCFullYear());
  });
});

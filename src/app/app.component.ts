import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpaceXDataService } from 'src/services/spacexdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = [
    // Flight Number, Launch Year, Rocket Name, and Details
      'flight_number',
      'date_utc',
      'name',
      'details'
    ]
  title = 'space-api';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private spaceXDataService: SpaceXDataService) {}

  ngOnInit() {
    this.spaceXDataService.getLaunches().subscribe( data => {
      console.log(data);
      this.dataSource.data = data;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getYear(utcDate: Date): number {
    return new Date(utcDate).getUTCFullYear();
  }
}

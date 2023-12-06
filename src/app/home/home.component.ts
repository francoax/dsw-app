/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import Package from '../models/package';
import { PropertyV2 } from '../models/property';
import { Car } from '../models/car';
import { MedicalAssistance } from '../models/medical-assistance';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '../services/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  inputValue!: string;
  packageList: Package[] = [];
  showAlert = false;
  propertyList: PropertyV2[] = [];
  requiredProps: PropertyV2[] = [];
  carList: Car[] = [];
  asistMedList: MedicalAssistance[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly appService: AppConfigService
  ) {}

  ngOnInit(): void {
    this.propertyList = this.route.snapshot.data['propertyList'];
    this.packageList = this.route.snapshot.data['packages'];
    this.carList = this.route.snapshot.data['cars'];
    this.asistMedList = this.route.snapshot.data['medAssists'];
    this.requiredProps = this.route.snapshot.data['propertyList'];

    this.appService.setDisplaySearchBar(true);
    this.appService.provideInputValue$.subscribe((value) => {
      this.inputValue = value;
      this.filterByProperty(this.inputValue);
    });
  }

  filterByProperty(prop: string) {
    const varible = prop;
    this.requiredProps = this.propertyList.filter((prop) => {
      return prop.location.name
        .toLocaleLowerCase()
        .includes(varible.toLocaleLowerCase());
    });
    if (this.requiredProps.length === 0) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
  }
}

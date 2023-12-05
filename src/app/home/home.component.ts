import { Component, OnInit } from '@angular/core';
import Package from '../models/package';
import { Property } from '../models/property';
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
  packageList: Package[] = [];
  propertyList: Property[] = [];
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

    this.appService.setDisplaySearchBar(true);
  }
}

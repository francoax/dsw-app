/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import Package from '../models/package';
import { PropertyV2 } from '../models/property';
import { Car } from '../models/car';
import { MedicalAssistance } from '../models/medical-assistance';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '../services/app/app.service';
import { Subscription, finalize } from 'rxjs';
import { SkeletonsService } from '../services/skeletons/skeletons.service';
import { HomeDataService } from '../services/app/home-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private homeDataSubscription: Subscription | undefined;
  private inputValueSubscription: Subscription | undefined;

  isLoading$ = this.skeletonService.homeLoading$;
  inputValue!: string;
  showAlert = false;

  packageList: Package[] = [];
  propertyList: PropertyV2[] = [];
  requiredProps: PropertyV2[] = [];
  carList: Car[] = [];
  asistMedList: MedicalAssistance[] = [];

  constructor(
    private readonly appService: AppConfigService,
    private readonly skeletonService: SkeletonsService,
    private readonly homeService: HomeDataService
  ) {}

  ngOnInit(): void {
    this.skeletonService.showHomeLoading();
    this.homeDataSubscription = this.homeService.initHomeData().subscribe({
      next: ([packages, properties]) => {
        this.packageList = packages;
        this.propertyList = properties;
        this.requiredProps = properties;
      },
      complete: () => this.skeletonService.hideHomeLoading(),
    });

    this.appService.setDisplaySearchBar(true);
    this.inputValueSubscription = this.appService.provideInputValue$.subscribe(
      (value) => {
        this.inputValue = value;
        this.filterByProperty(this.inputValue);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.homeDataSubscription) {
      this.homeDataSubscription.unsubscribe();
    }
    if (this.inputValueSubscription) {
      this.inputValueSubscription.unsubscribe();
    }
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

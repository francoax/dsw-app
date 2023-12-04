/* eslint-disable @typescript-eslint/no-unused-vars */
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
  inputValue!: string;
  packageList: Package[] = [];
  propertyList: Property[] = [];
  requiredProps: Property[] = [];
  carList: Car[] = [];
  asistMedList: MedicalAssistance[] = [];

  constructor(
    private readonly route : ActivatedRoute,
    private readonly appService : AppConfigService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ propertyList, packages, cars, medAssists }) => {
      this.propertyList = propertyList;
      this.packageList = packages;
      this.carList = cars;
      this.asistMedList = medAssists;
      this.requiredProps = propertyList;
    })

    this.appService.setDisplaySearchBar(true);
    this.appService.provideInputValue$.subscribe( value =>{
      this.inputValue = value;
      this.filterByProperty(this.inputValue);

    })
  }

  filterByProperty(prop:string){
    const varible = prop;
    this.requiredProps= this.propertyList.filter(prop => {
      return prop.location.name.toLocaleLowerCase().includes(varible.toLocaleLowerCase())
    });

  }




}

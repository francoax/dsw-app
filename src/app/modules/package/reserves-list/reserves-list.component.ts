/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { Property } from 'src/app/models/property';
import Reserve from 'src/app/models/reserve';
import { CarService } from 'src/app/services/car/car.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MedicalAssistanceService } from 'src/app/services/medical-assitance/medical-assistance.service';
import { PackageService } from 'src/app/services/package/package.service';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';

interface ReserveDetails {
  location: string;
  propertyAddress: string;
  propertyType: string;
  car: string;
  medicalAssistance: string;
  dateStart: string;
  dateEnd: string;
}

@Component({
  selector: 'app-reserves-list',
  templateUrl: './reserves-list.component.html',
  styleUrls: ['./reserves-list.component.scss'],
})
export class ReservesListComponent implements OnInit {
  reserves: ReserveDetails[] = [];
  reservesFull: ReserveDetails[] = [];
  dateFilterForm = new FormGroup({
    radioOption: new FormControl(''),
    dateFilter: new FormControl('', Validators.required),
  });
  error = false;

  constructor(
    private reserveService: ReserveService,
    private packageService: PackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { token } = JSON.parse(localStorage.getItem('loggedUser') || '');
    this.reserveService.getReserves(token).subscribe((response) => {
      response.data.forEach((reserve: Reserve) => {
        this.reserves.push(this.getReserveDetails(reserve));
      });
    });
    this.reservesFull = this.reserves;
  }

  getReserveDetails(reserve: Reserve): ReserveDetails {
    let reserveDetails: ReserveDetails = {
      location: '',
      propertyAddress: '',
      propertyType: '',
      car: '',
      medicalAssistance: '',
      dateStart: '',
      dateEnd: '',
    };
    this.packageService
      .getPackage(reserve.packageReserved)
      .subscribe((response) => {
        const propertyId = response.data.property;
        const carId = response.data.car;
        const medicalAssistanceId = response.data.medicalAssistance;

        const properties: Property[] = this.route.snapshot.data['propertyList'];
        properties.forEach((property) => {
          if (property._id === propertyId) {
            reserveDetails.propertyAddress = property.address;
          }
        });

        const cars: Car[] = this.route.snapshot.data['cars'];
        cars.forEach((car) => {
          if (car.id === carId) {
            reserveDetails.car = `${car.brand} ${car.model}`;
            const locations = this.route.snapshot.data['locations'];
            locations.forEach((location: { id: string; name: string }) => {
              if (location.id === car.locality) {
                reserveDetails.location = location.name;
              }
            });
          }
        });

        const medicalAssists: MedicalAssistance[] =
          this.route.snapshot.data['medAssists'];
        medicalAssists.forEach((medAssist) => {
          if (medAssist._id === medicalAssistanceId) {
            reserveDetails.medicalAssistance = `${medAssist.description} Tipo ${medAssist.coverageType}`;
          }
        });

        reserveDetails.dateStart = reserve.date_start;
        reserveDetails.dateEnd = reserve.date_end;

        return reserveDetails; //aca devuelve
      });

    return reserveDetails;
  }

  filterReserves() {
    this.resetFilter();

    if (this.dateFilterForm.value.radioOption === 'option1') {
      this.reserves = this.reserves.filter(
        (reserve) =>
          new Date(reserve.dateStart) >
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }

    if (this.dateFilterForm.value.radioOption === 'option2') {
      this.reserves = this.reserves.filter(
        (reserve) =>
          new Date(reserve.dateEnd) <=
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }
  }

  resetFilter() {
    this.reserves = this.reservesFull;
  }
}

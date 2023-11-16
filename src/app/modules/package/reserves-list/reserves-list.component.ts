/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import Reserve from 'src/app/models/reserve';
import { CarService } from 'src/app/services/car/car.service';
import { MedicalAssistanceService } from 'src/app/services/medical-assitance/medical-assistance.service';
import { PackageService } from 'src/app/services/package/package.service';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';

interface ReserveDetails {
  location?: string;
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

  constructor(
    private reserveService: ReserveService,
    private packageService: PackageService,
    private propertyService: PropertyServiceService,
    private carService: CarService,
    private medicalAssistance: MedicalAssistanceService
  ) {}

  ngOnInit() {
    const { token } = JSON.parse(localStorage.getItem('loggedUser') || '');
    this.reserveService.getReserves(token).subscribe((response) => {
      response.data.forEach((reserve: Reserve) => {
        this.reserves.push(this.getReserveDetails(reserve));
      });
    });
  }

  getReserveDetails(reserve: Reserve): ReserveDetails {
    let reserveDetails: ReserveDetails = {
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

        this.propertyService.getProperty(propertyId).subscribe((property) => {
          reserveDetails.propertyAddress = property.data.address;
        });
        this.carService.getCar(carId).subscribe((car) => {
          reserveDetails.car = `${car.data.brand} ${car.data.model}`;
        });
        this.medicalAssistance
          .getOne(medicalAssistanceId)
          .subscribe((medicalAssistance) => {
            reserveDetails.medicalAssistance = `${medicalAssistance.data.description} Tipo ${medicalAssistance.data.coverageType}`;
          });

        reserveDetails.dateStart = reserve.date_start;
        reserveDetails.dateEnd = reserve.date_end;

        return reserveDetails; //aca devuelve
      });

    return reserveDetails;
  }
}
